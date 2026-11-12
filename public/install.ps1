# Doitx installer for Windows x64.
# Installs Docker Desktop when it is missing, then installs Doitx.
# Usage: irm https://doitx.ai/install.ps1 | iex

$ErrorActionPreference = "Stop"
# DOWNLOAD_BASE_URL can be overridden via the environment.
$DownloadBase = $env:DOWNLOAD_BASE_URL
if ([string]::IsNullOrWhiteSpace($DownloadBase)) {
  $DownloadBase = "https://doitx.ai/releases"
}
$releaseApi = "$DownloadBase/latest"
$installer = Join-Path $env:TEMP "Doitx-Setup.exe"

function Get-DockerCli {
  $command = Get-Command docker.exe -ErrorAction SilentlyContinue
  if ($command) { return $command.Source }
  $candidate = Join-Path $env:ProgramFiles "Docker\Docker\resources\bin\docker.exe"
  if (Test-Path $candidate) { return $candidate }
  return $null
}

function Test-DockerEngine {
  $cli = Get-DockerCli
  if (-not $cli) { return $false }
  try {
    & $cli info 2>$null | Out-Null
    return ($LASTEXITCODE -eq 0)
  } catch {
    return $false
  }
}

function Get-DockerDesktopPath {
  return (Join-Path $env:ProgramFiles "Docker\Docker\Docker Desktop.exe")
}

function Install-DockerDesktop {
  $winget = Get-Command winget.exe -ErrorAction SilentlyContinue
  if ($winget) {
    Write-Host "Installing Docker Desktop with winget. Approve the administrator prompt if it appears..."
    & $winget.Source install --id Docker.DockerDesktop -e --accept-source-agreements --accept-package-agreements
    if ($LASTEXITCODE -eq 0 -and (Test-Path (Get-DockerDesktopPath))) { return }
    Write-Host "winget could not install Docker Desktop. Falling back to Docker's installer."
  }

  $dockerInstaller = Join-Path $env:TEMP "DockerDesktopInstaller.exe"
  Write-Host "Downloading Docker Desktop..."
  Invoke-WebRequest -Uri "https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe" -OutFile $dockerInstaller -UseBasicParsing
  try {
    $process = Start-Process -FilePath $dockerInstaller -Verb RunAs -Wait -PassThru
    if ($process.ExitCode -ne 0) {
      throw "Docker Desktop installer exited with code $($process.ExitCode)."
    }
  } finally {
    Remove-Item $dockerInstaller -Force -ErrorAction SilentlyContinue
  }
}

Write-Host "Checking Docker..."
if (-not (Test-DockerEngine)) {
  if (-not (Test-Path (Get-DockerDesktopPath))) {
    Write-Host "Docker Desktop is not installed. Doitx runs its local backend in Docker."
    try {
      Install-DockerDesktop
    } catch {
      Write-Host "Docker Desktop could not be installed: $($_.Exception.Message)"
      Write-Host "Install it from https://www.docker.com/products/docker-desktop/ and run this command again."
    }
  }

  if (Test-Path (Get-DockerDesktopPath) -and -not (Test-DockerEngine)) {
    Write-Host "Starting Docker Desktop. The first launch may ask you to accept the license and may need WSL2."
    Start-Process -FilePath (Get-DockerDesktopPath) | Out-Null
    Write-Host "Waiting for the Docker engine. This can take a few minutes on first launch..."
    for ($attempt = 0; $attempt -lt 90; $attempt++) {
      Start-Sleep -Seconds 5
      if (Test-DockerEngine) { break }
    }
  }
}

if (Test-DockerEngine) {
  Write-Host "Docker is ready."
} else {
  Write-Host "Docker is not running yet. Finish Docker Desktop's first-run steps (or reboot if WSL2 was installed), then launch Doitx."
}

Write-Host "Looking up the latest Doitx release..."
$headers = @{ Accept = "application/vnd.github+json" }
$release = Invoke-RestMethod -Uri $releaseApi -Headers $headers
$asset = $release.assets |
  Where-Object { $_.name -like "*.exe" -and $_.name -notlike "*uninstaller*" } |
  Select-Object -First 1
if (-not $asset) {
  throw "Could not find a Windows installer in the latest release."
}

try {
  Write-Host "Downloading $($asset.name)..."
  Invoke-WebRequest -Uri $asset.browser_download_url -OutFile $installer -UseBasicParsing

  Write-Host "Installing Doitx..."
  $process = Start-Process -FilePath $installer -ArgumentList "/S" -Wait -PassThru
  if ($process.ExitCode -ne 0) {
    throw "The installer exited with code $($process.ExitCode)."
  }
} finally {
  Remove-Item $installer -Force -ErrorAction SilentlyContinue
}

Write-Host "Doitx is installed. Launch it from the Start menu."
