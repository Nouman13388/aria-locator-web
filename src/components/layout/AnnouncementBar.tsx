import { Link } from "@tanstack/react-router";
import { homeLabels, homeRevision } from "../../data/home";
import { announcementStorageKey } from "../../data/site";
export function AnnouncementBar() {
  return (
    <aside className="announcement" aria-label="Demo notice">
      <div className="announcement-inner">
        <p>{homeLabels.notice}</p>
        <Link to="/explore">{homeRevision.noticeLink}</Link>
        <button
          aria-label={homeLabels.dismissNotice}
          onClick={() => {
            document.documentElement.dataset.demoNotice = "dismissed";
            try {
              sessionStorage.setItem(announcementStorageKey, "1");
            } catch {}
          }}
        >
          ×
        </button>
      </div>
    </aside>
  );
}
