import GitHub from 'github-api';
import Requestable from 'github-api/dist/components/Requestable';
import find from 'lodash/fp/find';
import groupBy from 'lodash/fp/groupBy';

class CustomGithub extends GitHub {

  authorized = false;

  constructor(auth) {
    super(auth);
    if (auth) {
      this.authorized = true;
    }
  }

  getIssueReactions = (owner, repo, issue) => new IssueReactions(
    this.__auth,
    this.__apiBase,
    'squirrel-girl-preview',
    owner,
    repo,
    issue
  );

  getAuthenticated = () => (
    Promise.resolve(
      this.authenticated ||
      this.__auth
        ? this.getUser().getProfile().then(({ data }) => this.authenticated = data)
        : null
    )
  );
}

const url = new URL(window.location.href);

console.log(url.searchParams.get('code'));

export default new CustomGithub({
  token: url.searchParams.get('code'),
});

const INITIAL_REACTIONS = {
  '+1': null,
  '-1': null,
  'smile': null,
  'confused': null,
  'heart': null,
  'hooray': null,
};

class Reactions extends Requestable {
  constructor(auth, apiBase, AcceptHeader, owner, repo, issue) {
    super(auth, apiBase, AcceptHeader);
    Object.assign(this, { owner, repo, issue });
  }
  set(data) {
    return Object.assign(this, INITIAL_REACTIONS, groupBy('content', data), { data });
  }
}

export class IssueReactions extends Reactions {
  async list() {
    const { owner, repo, issue } = this;
    const { data } = await this._request(
      'GET',
      `/repos/${ owner }/${ repo }/issues/${ issue }/reactions`
    );
    this.set(data);
    return this;
  }
  async create({ content }) {
    const { owner, repo, issue } = this;
    const reaction = await this._request(
      'POST',
      `/repos/${ owner }/${ repo }/issues/${ issue }/reactions`,
      { content }
    );
    this.data.push(reaction.data);
    this.set(this.data);
    return this;
  }
  async delete(id) {
    const reaction = this.findMine({ id });
    await this._request(
      'DELETE',
      `/reactions/${ id }`
    );
    this.data.splice(this.data.indexOf(reaction.data), 1);
    this.set(this.data);
    return this;
  }
  findMine(partialReaction) {
    return find(partialReaction, this.data);
  }
}
