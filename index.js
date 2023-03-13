const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const token = core.getInput('token');
    const octokit = github.getOctokit(token);

    const tagName = core.getInput('tag_name');
    const name = core.getInput('name');
    const prerelease = core.getInput('prerelease');

    const { data: release } = await octokit.rest.repos.createRelease({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      tag_name: tagName,
      name: name,
      prerelease: prerelease
    });

    core.setOutput('id', release.id);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
