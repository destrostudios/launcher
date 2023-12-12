# launcher

Our cross-game launcher, offering the possibility to login, download, update and start games.

## How to release a new version

- Make sure you have either `GH_TOKEN` or `GITHUB_TOKEN` environment variable with a valid token set (https://www.electron.build/configuration/publish.html)
- Increase package.json versions (both `/package.json` and `/src/package.json`)
- git commit and push
- npm run deploy
- Manually release the drafted GitHub release
