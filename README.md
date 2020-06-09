![Alt text](src/startup-space-web/ui/pages/assets/image/logo/startup-space.png "Title")
# Teste básico de React
Este projeto foi criado utilizando [Create React App](https://github.com/facebook/create-react-app) e serve como
base para realização do teste proposto a seguir.

## Contexto
Devido ao numero crescente de startups na região, foi idealizada uma plataforma na 
qual os startupeiros possam cadastrar suas startups, ou então entrar em alguma startup cadastrada.
O objetivo inicial da plataforma é permitir que os startupeiros visualizem todas startups da região, bem como seus membros.
No futuro essa plataforma pode vir a crescer bastante e diversas novas demandas podem aparecer, então o projeto deve
ser feito de forma que seja possivel escalar de pequeno até médio porte 

## Requisitos funcionais
- Autenticação
    - Deve ser possivel um usuário cadastrar-se e autenticar-se na plataforma utilizando email e senha
- Startups
    - Ao se cadastrar, o usuário deve escolher entre entrar em uma das startups existentes, ou criar uma
    - Entrar/Sair
        - Um usuário não pode entrar em uma startup caso ja pertença ou seja dono de uma
        - Um usuário pode sair da startup a qual pertence
    - Criação/Exclusão
        - Para criar uma startup deve ser informado o nome e a descrição da mesma
        - Um usuário não pode criar uma startup caso ja pertença ou seja dono de uma
        - Um usuário pode excluir sua startup se for dono dela
        - Quando uma startup é excluida, seus membros ficam sem startup

## Requisitos não funcionais
- Deve ser utilizado o firebase como backend
- O teste deve ser feito em typecript ou javascript

## Critérios de avaliação
- A parte visual **NÃO** sera levada em consideração para avaliação,
o visual deve ser o mais simples e funcional possivel
- A estrutura de pastas e de código do projeto sera avaliada, uma boa estrutura é organizada e de facil entendimento
- A forma como os padrões de projeto forem utilizados será avaliada (redux/mobx/...)
- Serão avaliadas boas praticas de programação em geral
- O tempo de entrega **NÃO** sera avaliado, desde que seja entregue no prazo estipulado



## Create React App (Instruções padrão)
### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
