import React from 'react';
import IssueReactions from './IssueReactions';
import Markdown from './Markdown';

const Proposal = ({ number, title, body }) => (
  <div>
    <h3>{ title }</h3>
    <Markdown>{ body }</Markdown>
    <IssueReactions issueNumber={ number } />
  </div>
);

export default Proposal;
