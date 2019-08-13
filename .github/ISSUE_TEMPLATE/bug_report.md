---
name: Bug report
about: Create a report to help us improve
title: ''
labels: bug
assignees: ''

---

**Describe the bug**
A clear and concise description of what the bug is.
Be careful, Chrome can output some `Warning` without affecting the behavior of this image like this one
`[0709/182256.661108:WARNING:dns_config_service_posix.cc(335)] Failed to read DnsConfig.`

**To Reproduce**
Steps to reproduce the behavior:
1. Indicate the version of the image using `docker image inspect --format='{{index .RepoDigests 0}}' zenika/alpine-chrome`
2. Execute 'docker ....'
3. See error
If you used some scripts, please attach them.

**Expected behavior**
A clear and concise description of what you expected to happen.

**Logs**
If applicable, add logs to help explain your problem.

**Versions (please complete the following information):**
 - chrome: [e.g. 73] with `docker run -it --rm --entrypoint "" zenika/alpine-chrome chromium-browser --version`
 - Docker engine: [e.g. 18.09] with `docker version`

**Additional context**
Add any other context about the problem here.
