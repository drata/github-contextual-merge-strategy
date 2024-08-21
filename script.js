/* global MutationObserver */

function updateStrategy() {
  const branch = document.querySelector('.head-ref').textContent;

  if (branch === 'release') {
    // For PRs targeting the release branch, use Squash and Merge
    document.querySelector('.merge-message details button[value=squash]').click();
    // Hide the other buttons
    document.querySelector('.merge-message details button[value=merge]').style.visibility = "hidden";
    document.querySelector('.merge-message details button[value=rebase]').style.visibility = "hidden";

  } else if (branch.startsWith('rc/')) {
    // For PRs targeting main from rc/* branches, use Merge Commit
    document.querySelector('.merge-message details button[value=merge]').click();
    // Hide the other buttons
    document.querySelector('.merge-message details button[value=squash]').style.visibility = "hidden";
    document.querySelector('.merge-message details button[value=rebase]').style.visibility = "hidden";

  } else if (branch === 'main') {
    // For PRs targeting main from any other branches (including hotfix/*), use Squash and Merge
    document.querySelector('.merge-message details button[value=squash]').click();
    // Hide the other buttons
    document.querySelector('.merge-message details button[value=merge]').style.visibility = "hidden";
    document.querySelector('.merge-message details button[value=rebase]').style.visibility = "hidden";
  }
}

function main() {
  const details = document.querySelector('.merge-message details');

  if (details) {
    updateStrategy();
  }

  const actions = document.querySelector('.discussion-timeline-actions');

  if (!actions) {
    return;
  }

  const observer = new MutationObserver(() => {
    if (document.querySelector('.merge-message details')) {
      observer.disconnect();
      updateStrategy();
    }
  });

  observer.observe(actions, { subtree: true, childList: true });
}

main();