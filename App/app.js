import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import HomePage from './components/pages/HomePage';
import GitTerminal from './components/features/GitTerminal';
import GitBranchVisualizer from './components/features/GitBranchVisualizer';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background-color: #2a2a72;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  transition: color 0.2s;
  
  &:hover {
    color: #87CEFA;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
`;

const Footer = styled.footer`
  background-color: #f8f9fa;
  padding: 1.5rem;
  text-align: center;
  border-top: 1px solid #e9ecef;
`;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageTitle = styled.h1`
  margin-bottom: 2rem;
  color: #2a2a72;
`;

const ExplorerPage = () => (
  <PageContainer>
    <PageTitle>Explorer les commandes Git</PageTitle>
    <p>Cette page présentera toutes les commandes Git organisées par catégories.</p>
    {/* Ici viendra notre composant de liste de commandes */}
  </PageContainer>
);

const PlaygroundPage = () => (
  <PageContainer>
    <PageTitle>Playground Git interactif</PageTitle>
    <h2>Terminal Git</h2>
    <p>Essayez les commandes Git dans notre terminal interactif.</p>
    <GitTerminal />
    
    <h2>Visualiseur de branches</h2>
    <p>Visualisez l'évolution d'un dépôt Git avec notre outil interactif.</p>
    <GitBranchVisualizer />
  </PageContainer>
);

const TimeMachinePage = () => (
  <PageContainer>
    <PageTitle>Git Time Machine</PageTitle>
    <p>Remontez le temps à travers l'historique d'un dépôt Git et visualisez son évolution.</p>
    {/* Ici viendra notre composant Git Time Machine */}
  </PageContainer>
);

const SenseiPage = () => (
  <PageContainer>
    <PageTitle>Git Sensei</PageTitle>
    <p>Notre assistant intelligent pour vous guider vers la commande Git appropriée à votre situation.</p>
    {/* Ici viendra notre composant Git Sensei */}
  </PageContainer>
);

const App = () => {
  return (
    <Router>
      <AppContainer>
        <Header>
          <Logo to="/">Git Commands Hub</Logo>
          <Nav>
            <NavLink to="/">Accueil</NavLink>
            <NavLink to="/explorer">Explorer</NavLink>
            <NavLink to="/playground">Playground</NavLink>
            <NavLink to="/time-machine">Time Machine</NavLink>
            <NavLink to="/sensei">Git Sensei</NavLink>
          </Nav>
        </Header>
        
        <MainContent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explorer" element={<ExplorerPage />} />
            <Route path="/playground" element={<PlaygroundPage />} />
            <Route path="/time-machine" element={<TimeMachinePage />} />
            <Route path="/sensei" element={<SenseiPage />} />
          </Routes>
        </MainContent>
        
        <Footer>
          <p>© 2025 Git Commands Hub. Projet open-source.</p>
          <p>
            <a href="https://github.com/votre-username/git-commands-hub" target="_blank" rel="noopener noreferrer">
              Contribuer sur GitHub
            </a>
          </p>
        </Footer>
      </AppContainer>
    </Router>
  );
};

export default App;