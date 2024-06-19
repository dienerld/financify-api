<h1 align="center">
  <a href="https://github.com/dienerld/financify-api">
    <!-- Please provide path to your logo here -->
    <img src="docs/images/logo.svg" alt="Logo" width="100" height="100">
  </a>
</h1>

<div align="center">
  Financify Api
  <br />
  <a href="#about"><strong>Explore the screenshots »</strong></a>
  <br />
  <br />
  <a href="https://github.com/dienerld/financify-api/issues/new?assignees=&labels=bug&template=01_BUG_REPORT.md&title=bug%3A+">Report a Bug</a>
  ·
  <a href="https://github.com/dienerld/financify-api/issues/new?assignees=&labels=enhancement&template=02_FEATURE_REQUEST.md&title=feat%3A+">Request a Feature</a>
  .
  <a href="https://github.com/dienerld/financify-api/issues/new?assignees=&labels=question&template=04_SUPPORT_QUESTION.md&title=support%3A+">Ask a Question</a>
</div>

<div align="center">
<br />

[![Project license](https://img.shields.io/github/license/dienerld/financify-api.svg?style=flat-square)](LICENSE)

[![Pull Requests welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg?style=flat-square)](https://github.com/dienerld/financify-api/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)
[![code with love by dienerld](https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%99%A5%20by-dienerld-ff1414.svg?style=flat-square)](https://github.com/dienerld)

</div>

<details open="open">
<summary>Table of Contents</summary>

- [About](#about)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
- [Roadmap](#roadmap)
- [Support](#support)
- [Contributing](#contributing)
- [Authors & contributors](#authors--contributors)
- [Security](#security)
- [License](#license)
- [Acknowledgements](#acknowledgements)

</details>

---

## About

O objetivo do projeto é criar uma API que possa ser utilizada por pequenas empresas e pessoas físicas para gerenciar suas finanças de forma simples e prática. Tratando de forma eficiente o controle de contas a pagar, contas a receber, fluxo de caixa, entre outros.

O projeto é fruto de um desafio próprio para aplicar estudos de aperfeiçoamento e aprendizado em desenvolvimento de softwares mais robustos e escaláveis. Aplicando conceitos de arquitetura de software, boas práticas de programação, testes automatizados, entre outros.

Utilizando um cenário de desenvolvimento real, o projeto será desenvolvido em etapas, onde cada etapa terá um objetivo específico a ser alcançado. A ideia é que o projeto seja desenvolvido de forma incremental, onde a cada etapa um novo recurso seja adicionado a aplicação.

### Built With

- Node.js
- TypeScript
- Vitest
- NestJs

## Getting Started

### Prerequisites

Para instalar o projeto, siga os passos abaixo:

1. Clone o repositório

```bash
git clone
```

2. Instale as dependências

```bash
yarn
```

3. Inicie o banco de dados

```bash
docker-compose up
```

Os arquivos do banco de dados serão salvos em uma pasta chamada .docker/financify-db-data em um diretório anterior a pasta atual do projeto. Isto acontece devido ao uso do sonarQube para análise de código, pois o mesmo estava gerando um erro ao tentar analisar a pasta .docker/financify-db-data por questões de permissões.

4. Inicie o servidor

```bash
yarn dev
```

## Roadmap

See the [open issues](https://github.com/dienerld/financify-api/issues) for a list of proposed features (and known issues).

- [Top Feature Requests](https://github.com/dienerld/financify-api/issues?q=label%3Aenhancement+is%3Aopen+sort%3Areactions-%2B1-desc) (Add your votes using the 👍 reaction)
- [Top Bugs](https://github.com/dienerld/financify-api/issues?q=is%3Aissue+is%3Aopen+label%3Abug+sort%3Areactions-%2B1-desc) (Add your votes using the 👍 reaction)
- [Newest Bugs](https://github.com/dienerld/financify-api/issues?q=is%3Aopen+is%3Aissue+label%3Abug)

## Support

> **[?]**
> Provide additional ways to contact the project maintainer/maintainers.

Reach out to the maintainer at one of the following places:

- [GitHub issues](https://github.com/dienerld/financify-api/issues/new?assignees=&labels=question&template=04_SUPPORT_QUESTION.md&title=support%3A+)
- Contact options listed on [this GitHub profile](https://github.com/dienerld)

## Contributing

First off, thanks for taking the time to contribute! Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make will benefit everybody else and are **greatly appreciated**.

Please read [our contribution guidelines](docs/CONTRIBUTING.md), and thank you for being involved!

## Authors & contributors

The original setup of this repository is by [Diener Dornelas](https://github.com/dienerld).

For a full list of all authors and contributors, see [the contributors page](https://github.com/dienerld/financify-api/contributors).

## Security

Financify Api follows good practices of security, but 100% security cannot be assured.
Financify Api is provided **"as is"** without any **warranty**. Use at your own risk.

_For more information and to report security issues, please refer to our [security documentation](docs/SECURITY.md)._

## License

This project is licensed under the **GNU General Public License v3**.

See [LICENSE](LICENSE) for more information.

## Acknowledgements

> **[?]**
> If your work was funded by any organization or institution, acknowledge their support here.
> In addition, if your work relies on other software libraries, or was inspired by looking at other work, it is appropriate to acknowledge this intellectual debt too.
