const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const token = core.getInput('token');
    const octokit = github.getOctokit(token);
    const tag = core.getInput('tag_name');
    const name = core.getInput('release_name');
    const body = core.getInput('body');
    const draft = core.getInput('draft');
    const prerelease = core.getInput('prerelease');

    const { data: release } = await octokit.rest.repos.createRelease({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      tag_name: tag,
      name: name,
      body: body,
      draft: draft === 'true',
      prerelease: prerelease === 'true',
    });

    core.setOutput('id', release.id);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
