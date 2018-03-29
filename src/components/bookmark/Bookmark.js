import React, { PureComponent } from "react";
import cl from "classnames";

import Note from "../note/Note";
import Link from "../link/Link";
import Icon from "../icon/Icon";
import Button from "../button/Button";
import "./Bookmark.css";

class Bookmark extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  toggleExpanded = () =>
    this.setState(prevState => ({ expanded: !prevState.expanded }));

  render() {
    const { title, url, notes } = this.props;

    return (
      <div className="bookmark">
        <div className="bookmark-row">
          <Link title={title} url={url}>
            <Icon name="bookmark" position="left" />
            {title}
          </Link>

          {notes && (
            <Button
              className={cl("button-expand", { expanded: this.state.expanded })}
              onClick={this.toggleExpanded}
              icon="angle-down"
              label={this.state.expanded ? "Close notes" : "Open notes"}
              aria-expanded={this.state.expanded}
            />
          )}
        </div>

        {notes &&
          this.state.expanded && (
            <div className="notes">
              {notes.map(
                (note, index) =>
                  typeof note === "string" ? (
                    <Note key={index} title={note} />
                  ) : (
                    <Note key={index} title={note.title} url={note.url} />
                  )
              )}
            </div>
          )}
      </div>
    );
  }
}

export default Bookmark;