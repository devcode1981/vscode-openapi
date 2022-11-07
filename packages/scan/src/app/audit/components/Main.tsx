import Header from "./Header";
import Summary from "./Summary";
import Footer from "./Footer";
import Issue from "./Issue";
import GoToFullReport from "./GoToFullReport";
import NoReport from "./NoReport";

import { useAppSelector, useAppDispatch } from "../store";
import { goToFullReport, goToLine, copyIssueId, openLink } from "../slice";
import Loading from "./Loading";

function Main() {
  const kdb = useAppSelector((state) => state.audit.kdb);
  const display = useAppSelector((state) => state.audit.display);
  const issues = useAppSelector((state) => state.audit.selected);
  const theme = useAppSelector((state) => state.theme);

  const dispatch = useAppDispatch();

  const hostGoToLine = (uri: string, line: number, pointer: string) =>
    dispatch(goToLine({ uri, line, pointer }));
  const hostCopyIssueId = (id: string) => dispatch(copyIssueId(id));
  const hostOpenLink = (href: string) => dispatch(openLink(href));

  const themeKind = theme?.theme?.kind === "dark" ? "dark" : "light";

  return (
    <>
      <style type="text/css">{css}</style>
      <div className={themeKind === "dark" ? "vscode-dark" : ""}>
        {display !== "no-report" && <Header openLink={hostOpenLink} themeKind={themeKind} />}
        {display === "full" && <Summary openLink={hostOpenLink} />}
        {display === "no-report" && <NoReport />}
        {display === "loading" && <Loading />}
        {issues.map((issue) => (
          <Issue
            kdb={kdb}
            issue={issue}
            key={issue.key}
            goToLine={hostGoToLine}
            copyIssueId={hostCopyIssueId}
            openLink={hostOpenLink}
          />
        ))}
        {display === "full" && issues.length === 0 && <h3>No issues found in this file</h3>}
        {display === "partial" && (
          <GoToFullReport goToFullReport={() => dispatch(goToFullReport())} />
        )}
        {display !== "no-report" && <Footer openLink={hostOpenLink} themeKind={themeKind} />}
      </div>
    </>
  );
}

const css = `body {
  background-color: var(--xliic-background);
  color: var(--xliic-foreground);
  margin: 0 10px !important;
}

#root small {
 font-size: 0.8em;
}

#root p {
  font-size: 0.8em;
}

#root h1 {
  font-size: 1.5em;
  font-weight: 600;
}

#root h2 {
  font-size: 1.2em;
  font-weight: 600;
}

#root h3 {
  font-size: 1em;
  font-weight: 600;
}

pre {
  white-space: pre-wrap;
}

.c_header {
  background-color: #f1f1f1;
  margin-bottom: 20px;
  margin-left: -20px;
  margin-right: -20px;
  padding: 10px 20px 10px 20px;
  top: 0px;
  border-bottom: 1px solid #bbb;
  color: black;
  font-size: 14px;
  z-index: 10;
}

.c_footer {
  background-color: #f1f1f1;

  padding: 20px 20px 20px 20px;
  margin-left: -20px;
  margin-right: -20px;
  bottom: 0px;
  border-top: 1px solid #bbb;
  color: black;
  font-size: 14px;
}
.bottom-menu ul {
  margin: 0px;
  padding: 0px;
}
.bottom-menu li {
  float: left;
  list-style: none;
  font-weight: bold;
  margin-right: 10px;
}
.bottom-menu li a {
  text-decoration: none;
}
.c_header span img,
.c_footer span img {
  width: 100px;
  margin-left: 10px;
}

.font-weight-bold {
  font-weight: bold;
}

.c_roundedbox {
  padding: 20px;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  margin-bottom: 20px;
}

.c_roundedbox_section {
  padding: 10px;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  margin-bottom: 10px;
}

.c_roundedbox_section > h2:first-child {
  margin-block-start: 0;
}

.c_roundedbox_section > p:last-child {
  margin-block-end: 0;
}

.c_roundedbox_section h1 {
  margin-top: 0px;
}
.c_roundedbox h1 {
  margin-top: 0px;
}
.c_roundedbox h1 span, .c_roundedbox h3 span {
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  padding: 2px 5px 2px 5px;
}

.progress-bar-holder {
  height: 10px;
  width: 100%;
  background-color: #c4c4c4;
  position: relative;
  border-radius: 10px;
  margin-top: 1em;
  margin-bottom: 1em;
}

.progress-bar {
  position: absolute;
  left: 0px;
  top: 0px;
  height: 100%;
  background-color: #000;
  border-radius: 10px;
}
.bar-red {
  background-color: #ff1d5a;
}
.bar-yellow {
  background-color: #ffb01d;
}
.bar-green {
  background-color: #7bd21e;
}
.issue-id {
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  padding: 2px 8px 3px 8px;
  background-color: #b1b0b0;
  color: #fff;
  cursor: pointer;
}

.dropbtn {
  background-color: #ffffff;
  color: #313131;
  padding: 10px 20px 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid #bbb;
  border-radius: 5px;
}

.dropbtn:hover,
.dropbtn:focus {
  background-color: #9d73aa;
  color: #ffffff;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0px;
  background-color: #f1f1f1;
  min-width: 260px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 0px 0px 10px 10px;
}
.dropdown-content-f {
  display: none;
  position: absolute;
  right: 0px;
  top: -120px;
  background-color: #f1f1f1;
  min-width: 260px;
  box-shadow: -2px -5px 16px 0px rgb(0 0 0 / 20%);
  z-index: 1;
  border-radius: 10px 10px 0px 0px;
}
.dropdown-content-f a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.show {
  display: block;
}

.vscode-dark .c_header,
.vscode-high-contrast .c_header {
  background-color: #1e1e1e;
  color: #f3f3f3;
  border-bottom: 1px solid #bbb;
}

.vscode-dark .c_footer,
.vscode-high-contrast .c_footer {
  background-color: #1e1e1e;
  color: #f3f3f3;
}

.vscode-dark .dropbtn {
  background-color: #835194;
  color: #ffffff;
  border: 1px solid #835194;
}

.vscode-high-contrast .dropbtn {
  background-color: #1e1e1e;
  color: #ffffff;
  border: 1px solid #1e1e1e;
}

.vscode-dark .dropdown-content,
.vscode-high-contrast .dropdown-content {
  background-color: #1e1e1e;
}

.vscode-dark .dropdown-content a,
.vscode-high-contrast .dropdown-content a {
  color: white;
}

.vscode-dark .dropdown-content a:hover,
.vscode-high-contrast .dropdown-content a:hover {
  background-color: #3c3b3b;
}

.vscode-dark .issue-id {
  border: 1px solid #834e93;
  background-color: #834c8f;
  color: #fff;
}

.vscode-high-contrast .issue-id {
  background-color: #1e1e1e;
}`;

export default Main;
