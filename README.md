# PIC Website

> **Attribution Notice**  
> This website documents the **Provenance Identity Continuity (PIC) Model**,  
> a theoretical framework created by **Nicola Gallo**.  
>  
> This website and all related materials are published and maintained by  
> **Nitro Agility S.r.l.**

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

---

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

---

## License

Content is published under **Creative Commons Attribution 4.0 International (CC BY 4.0)**.

For authorship, attribution requirements, and normative status, see the [PIC Specification](https://github.com/pic-protocol/pic-spec).