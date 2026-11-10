import { Link } from "@tanstack/react-router";
import { useCompactHeader } from "./useCompactHeader";
import { Wordmark } from "./Wordmark";
import { NavigationDrawer } from "./NavigationDrawer";
import { AreaChooser } from "../ui/AreaChooser";
import { homeLabels, homeRevision } from "../../data/home";
import { announcementStorageKey } from "../../data/site";
export function Header() {
  const compact = useCompactHeader();
  return (
    <>
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
      <div className={`header-slot ${compact ? "compact" : ""}`}>
        <header className="site-header">
          <div className="header-inner">
            <div className="header-brand-group">
              <NavigationDrawer />
              <Wordmark />
            </div>
            <AreaChooser />
          </div>
        </header>
      </div>
    </>
  );
}
