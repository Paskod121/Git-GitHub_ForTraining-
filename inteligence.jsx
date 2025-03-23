import React, { useState } from 'react';
import styled from 'styled-components';

const SenseiContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const QuestionContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const Question = styled.h3`
  color: #2a2a72;
  margin-bottom: 1.5rem;
`;

const OptionButton = styled.button`
  display: block;
  width: 100%;
  padding: 1rem;
  margin-bottom: 0.8rem;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  text-align: left;
  transition: all 0.2s;
  
  &:hover {
    background-color: #e9ecef;
    transform: translateY(-2px);
  }
`;

const ResultContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const CommandCode = styled.pre`
  background-color: #f8f9fa;
  border-radius: 4px;
  padding: 1rem;
  overflow-x: auto;
  border: 1px solid #dee2e6;
  margin: 1rem 0;
`;

const ResetButton = styled.button`
  background-color: #2a2a72;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  align-self: center;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #1a1a62;
  }
`;

const GitSensei = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [context, setContext] = useState({});
  const [result, setResult] = useState(null);
  
  const questions = [
    {
      id: 'goal',
      text: 'Que souhaitez-vous faire avec Git?',
      options: [
        { id: 'setup', text: 'Configurer Git ou démarrer un projet' },
        { id: 'changes', text: 'Travailler avec mes modifications locales' },
        { id: 'history', text: 'Explorer l\'historique du projet' },
        { id: 'collaborate', text: 'Collaborer avec d\'autres développeurs' },
        { id: 'branch', text: 'Gérer les branches' },
        { id: 'fix', text: 'Corriger quelque chose qui ne va pas' }
      ]
    },
    {
      id: 'setup',
      text: 'Comment souhaitez-vous démarrer?',
      options: [
        { id: 'config', text: 'Configurer Git sur ma machine' },
        { id: 'new', text: 'Créer un nouveau dépôt' },
        { id: 'existing', text: 'Utiliser un dépôt existant' }
      ]
    },
    {
      id: 'changes',
      text: 'Que souhaitez-vous faire avec vos modifications?',
      options: [
        { id: 'check', text: 'Vérifier l\'état de mes modifications' },
        { id: 'stage', text: 'Ajouter des fichiers à l\'index' },
        { id: 'unstage', text: 'Retirer des fichiers de l\'index' },
        { id: 'commit', text: 'Créer un commit' },
        { id: 'undo', text: 'Annuler mes modifications' }
      ]
    },
    {
      id: 'history',
      text: 'Comment souhaitez-vous explorer l\'historique?',
      options: [
        { id: 'view', text: 'Voir les commits récents' },
        { id: 'show', text: 'Examiner un commit spécifique' },
        { id: 'diff', text: 'Comparer des versions' },
        { id: 'blame', text: 'Savoir qui a modifié une ligne spécifique' }
      ]
    },
    {
      id: 'collaborate',
      text: 'Comment souhaitez-vous collaborer?',
      options: [
        { id: 'push', text: 'Envoyer mes modifications vers le dépôt distant' },
        { id: 'pull', text: 'Récupérer les modifications du dépôt distant' },
        { id: 'fetch', text: 'Récupérer sans fusionner' },
        { id: 'remote', text: 'Gérer les dépôts distants' }
      ]
    },
    {
      id: 'branch',
      text: 'Que souhaitez-vous faire avec les branches?',
      options: [
        { id: 'list', text: 'Voir les branches existantes' },
        { id: 'create', text: 'Créer une nouvelle branche' },
        { id: 'switch', text: 'Changer de branche' },
        { id: 'merge', text: 'Fusionner des branches' },
        { id: 'rebase', text: 'Réaliser un rebase' }
      ]
    },
    {
      id: 'fix',
      text: 'Quel problème rencontrez-vous?',
      options: [
        { id: 'amend', text: 'J\'ai fait une erreur dans mon dernier commit' },
        { id: 'reset', text: 'Je veux revenir à un état précédent' },
        { id: 'conflict', text: 'J\'ai des conflits de fusion' },
        { id: 'stash', text: 'Je dois mettre mes modifications de côté temporairement' }
      ]
    }
  ];
  
  // Base de connaissances des commandes Git
  const commandDatabase = {
    config: {
      title: 'Configuration de Git',
      description: 'Ces commandes vous permettent de configurer Git selon vos préférences.',
      commands: [
        {
          command: 'git config --global user.name "Votre Nom"',
          description: 'Définit votre nom d\'utilisateur pour tous les dépôts'
        },
        {
          command: 'git config --global user.email "votre.email@exemple.com"',
          description: 'Définit votre adresse email pour tous les dépôts'
        },
        {
          command: 'git config --list',
          description: 'Affiche toutes vos configurations Git actuelles'
        }
      ]
    },
    new: {
      title: 'Créer un nouveau dépôt',
      description: 'Pour démarrer un nouveau projet avec Git.',
      commands: [
        {
          command: 'git init',
          description: 'Initialise un nouveau dépôt Git dans le répertoire courant'
        },
        {
          command: 'git init [nom-du-projet]',
          description: 'Crée un nouveau dépôt avec le nom spécifié'
        }
      ]
    },
    existing: {
      title: 'Utiliser un dépôt existant',
      description: 'Pour récupérer un projet Git existant.',
      commands: [
        {
          command: 'git clone [url]',
          description: 'Clone un dépôt distant vers votre machine locale'
        },
        {
          command: 'git clone [url] [dossier]',
          description: 'Clone un dépôt dans un dossier spécifique'
        }
      ]
    },
    check: {
      title: 'Vérifier l\'état des modifications',
      description: 'Pour voir l\'état actuel de votre dépôt Git.',
      commands: [
        {
          command: 'git status',
          description: 'Affiche l\'état des fichiers (modifiés, indexés, non suivis)'
        },
        {
          command: 'git diff',
          description: 'Affiche les différences entre votre répertoire de travail et l\'index'
        }
      ]
    },
    stage: {
      title: 'Ajouter des fichiers à l\'index',
      description: 'Pour préparer vos modifications avant de créer un commit.',
      commands: [
        {
          command: 'git add [fichier]',
          description: 'Ajoute un fichier spécifique à l\'index'
        },
        {
          command: 'git add .',
          description: 'Ajoute tous les fichiers modifiés à l\'index'
        },
        {
          command: 'git add -p',
          description: 'Ajoute interactivement des parties spécifiques des fichiers'
        }
      ]
    },
    // Continuez avec les autres commandes...
  };
  
  const handleOptionClick = (optionId) => {
    const newContext = { ...context, [questions[currentStep].id]: optionId };
    setContext(newContext);
    
    // Si c'est une question de premier niveau, passez à la question spécifique
    if (currentStep === 0) {
      const nextStepId = questions.findIndex(q => q.id === optionId);
      if (nextStepId !== -1) {
        setCurrentStep(nextStepId);
      }
    } else {
      // Sinon, montrez le résultat
      setResult(commandDatabase[optionId]);
    }
  };
  
  const resetSensei = () => {
    setCurrentStep(0);
    setContext({});
    setResult(null);
  };
  
  const currentQuestion = questions[currentStep];
  
  return (
    <SenseiContainer>
      {!result ? (
        <QuestionContainer>
          <Question>{currentQuestion.text}</Question>
          {currentQuestion.options.map(option => (
            <OptionButton 
              key={option.id} 
              onClick={() => handleOptionClick(option.id)}
            >
              {option.text}
            </OptionButton>
          ))}
        </QuestionContainer>
      ) : (
        <ResultContainer>
          <h2>{result.title}</h2>
          <p>{result.description}</p>
          
          {result.commands.map((cmd, index) => (
            <div key={index}>
              <CommandCode>{cmd.command}</CommandCode>
              <p>{cmd.description}</p>
            </div>
          ))}
          
          <ResetButton onClick={resetSensei}>Poser une autre question</ResetButton>
        </ResultContainer>
      )}
    </SenseiContainer>
  );
};

export default GitSensei;