import { useState } from "react";
import type { Locale } from "../i18n/locales";
import { getTeamDemoCopy } from "../i18n/team-demo";

const TEAM_COLORS = [
  "#F5A03C",
  "#6A6BF5",
  "#3EC5A8",
  "#F2622A",
  "#3B82F6",
  "#9B5CF6",
  "#D9508A",
  "#1F7F5F",
] as const;
const STATE_COLORS = {
  done: "#30a24b",
  running: "#f5a03c",
  wait: "#85858a",
} as const;

function initial(value: string): string {
  return Array.from(value)[0] ?? "";
}

export function TeamWorkspaceDemo({ locale }: { locale: Locale }) {
  const copy = getTeamDemoCopy(locale);
  const [active, setActive] = useState(0);
  const team = copy.teams[active];
  const color = TEAM_COLORS[active];

  return (
    <div className="team-demo">
      <div className="team-demo__frame">
        <aside className="team-demo__sidebar">
          <div className="team-demo__chrome">
            <div className="product-demo__traffic" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <span className="team-demo__chrome-label">{copy.workspace}</span>
          </div>
          <div className="team-demo__list" role="tablist" aria-label={copy.workspace}>
            {copy.teams.map((item, index) => (
              <button
                key={item.name}
                type="button"
                role="tab"
                aria-selected={index === active}
                className={`team-demo__team${index === active ? " is-active" : ""}`}
                onClick={() => setActive(index)}
              >
                <span
                  className="team-demo__avatar"
                  style={{ background: TEAM_COLORS[index] }}
                  aria-hidden="true"
                >
                  {initial(item.name)}
                </span>
                <span className="team-demo__team-copy">
                  <span className="team-demo__team-name">{item.name}</span>
                  <span className="team-demo__team-meta">
                    {item.lead} · {copy.members(item.members)}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </aside>

        <div className="team-demo__main">
          <div className="team-demo__topbar">
            <div className="team-demo__heading">
              <span
                className="team-demo__avatar"
                style={{ background: color }}
                aria-hidden="true"
              >
                {initial(team.name)}
              </span>
              <span className="team-demo__heading-copy">
                <span className="team-demo__title">{team.name}</span>
                <span className="team-demo__sub">
                  {team.lead} · {copy.members(team.members)}
                </span>
              </span>
            </div>
            <span className="product-demo__status">
              <span className="product-demo__status-dot" />
              {copy.running}
            </span>
          </div>

          <div className="team-demo__tabs" role="tablist" aria-label={copy.workspace}>
            {copy.teams.map((item, index) => (
              <button
                key={item.name}
                type="button"
                role="tab"
                aria-selected={index === active}
                className={`team-demo__tab${index === active ? " is-active" : ""}`}
                onClick={() => setActive(index)}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="team-demo__thread" key={active}>
            <p className="team-demo__thread-label">{copy.teamChat}</p>

            <div className="team-demo__msg team-demo__msg--user" style={{ animationDelay: "40ms" }}>
              <div className="team-demo__bubble team-demo__bubble--user">{team.prompt}</div>
            </div>

            <div className="team-demo__msg" style={{ animationDelay: "140ms" }}>
              <div className="team-demo__bubble">
                <span className="team-demo__who">
                  <span
                    className="team-demo__avatar team-demo__avatar--sm"
                    style={{ background: color }}
                    aria-hidden="true"
                  >
                    {initial(team.lead)}
                  </span>
                  {team.lead}
                  <span className="team-demo__badge">{copy.leadBadge}</span>
                </span>
                <span>{team.leadLine}</span>
              </div>
            </div>

            {team.replies.map((reply, index) => (
              <div
                className="team-demo__msg"
                key={reply.name}
                style={{ animationDelay: `${240 + index * 120}ms` }}
              >
                <div className="team-demo__bubble">
                  <span className="team-demo__who">
                    <span
                      className="team-demo__avatar team-demo__avatar--sm team-demo__avatar--member"
                      aria-hidden="true"
                    >
                      {initial(reply.name)}
                    </span>
                    {reply.name}
                  </span>
                  <span>{reply.text}</span>
                </div>
              </div>
            ))}

            <div className="team-demo__msg" style={{ animationDelay: "620ms" }}>
              <div className="team-demo__artifact">
                <span className="team-demo__artifact-title">{team.artifact.title}</span>
                {team.artifact.lines.map((line) => (
                  <span className="team-demo__artifact-line" key={line}>
                    {line}
                  </span>
                ))}
              </div>
            </div>

            <div className="team-demo__msg" style={{ animationDelay: "720ms" }}>
              <div className="team-demo__approval">
                <span className="team-demo__approval-text">{team.approval}</span>
                <span className="team-demo__approval-actions" aria-hidden="true">
                  <span className="team-demo__approve">{copy.approve}</span>
                  <span className="team-demo__later">{copy.later}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="team-demo__composer">
            <div className="team-demo__composer-box">{copy.composer}</div>
          </div>
        </div>

        <aside className="team-demo__panel">
          <h3>{copy.activityTitle}</h3>
          <ul className="team-demo__activity">
            {team.activity.map((item) => (
              <li key={`${item.time}-${item.text}`}>
                <span
                  className="team-demo__dot"
                  style={{ background: STATE_COLORS[item.state] }}
                  aria-hidden="true"
                />
                <span className="team-demo__activity-copy">
                  <span className="team-demo__activity-time">{item.time}</span>
                  <span className="team-demo__activity-text">{item.text}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="team-demo__routine">
            <span className="team-demo__routine-label">{copy.routineLabel}</span>
            <p>{team.routine}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
