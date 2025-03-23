import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Hero = styled.section`
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #2a2a72 0%, #009ffd 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const FeatureCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: #2a2a72;
`;

const FeatureDescription = styled.p`
  color: #555;
  line-height: 1.6;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: #2a2a72;
  color: white;
  text-decoration: none;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-weight: bold;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #1a1a62;
  }
`;

const HomePage = () => {
  const features = [
    {
      id: 'feature-1',
      title: 'Visualiseur de workflows Git',
      description: 'Explorez visuellement les enchaînements de commandes dans des scénarios réels de développement.'
    },
    {
      id: 'feature-2',
      title: 'Git Time Machine',
      description: 'Remontez le temps et visualisez l\'évolution d\'un dépôt à travers chaque commande exécutée.'
    },
    {
      id: 'feature-3',
      title: 'Générateur de commandes',
      description: 'Créez et partagez des commandes Git complexes grâce à notre interface intuitive.'
    },
    {
      id: 'feature-4',
      title: 'Git Sensei',
      description: 'Notre assistant intelligent qui vous guide vers la commande appropriée à votre situation.'
    },
    {
      id: 'feature-5',
      title: 'Système de défis Git',
      description: 'Apprenez en résolvant des problèmes Git réels dans notre environnement sandbox.'
    },
    {
      id: 'feature-6',
      title: 'Documentation interactive',
      description: 'Consultez une documentation complète et interactive sur toutes les commandes Git.'
    }
  ];

  return (
    <HomeContainer>
      <Hero>
        <Title>Git Commands Hub</Title>
        <Subtitle>Apprenez Git visuellement. Maîtrisez-le interactivement.</Subtitle>
        <CTAButton to="/explorer">Commencer l'exploration</CTAButton>
      </Hero>

      <h2>Fonctionnalités uniques</h2>
      <FeaturesGrid>
        {features.map(feature => (
          <FeatureCard key={feature.id}>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>

      <h2>Pourquoi Git Commands Hub?</h2>
      <p>
        Notre approche unique combine visualisation interactive, apprentissage pratique et collaboration 
        communautaire pour rendre l'apprentissage de Git plus intuitif et efficace que jamais. 
        Que vous soyez débutant ou expert, notre plateforme vous offre les outils nécessaires 
        pour maîtriser Git et optimiser votre workflow de développement.
      </p>
      
      <div style={{ textAlign: 'center', margin: '3rem 0' }}>
        <CTAButton to="/explorer">Explorer les commandes</CTAButton>
      </div>
    </HomeContainer>
  );
};

export default HomePage;