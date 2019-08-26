---
name: 🐛 Bug report
about: If something isn't working 🤕
title: ""
labels: bug
assignees: ""
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

**What is the expected behavior?**
A clear and concise description of what you expected to happen.

**What is the actual behavior?**

**Possible solution**

**Logs**
If applicable, add logs to help explain your problem.

**Versions**

| Software      | Version(s)   | How-to                                                                                |
| ------------- | ------------ | ------------------------------------------------------------------------------------- |
| Chromium      | 76.0.3809.87 | `docker run -it --rm --entrypoint "" zenika/alpine-chrome chromium-browser --version` |
| Image         | ad3dc8       | `docker image inspect --format='{{index .RepoDigests 0}}' zenika/alpine-chrome`       |
| Docker Engine | 18.09        | `docker version`                                                                      |

**Additional context**
Add any other context about the problem here.
