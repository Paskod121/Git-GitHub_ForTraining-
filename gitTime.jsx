import React, { useState } from 'react';
import styled from 'styled-components';

const TimelineContainer = styled.div`
  margin: 3rem 0;
  position: relative;
`;

const TimelineLine = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 4px;
  background-color: #ddd;
  transform: translateX(-50%);
`;

const TimelineNodeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
`;

const TimelineContent = styled.div`
  width: 45%;
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const TimelineNode = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${props => props.active ? '#2a2a72' : '#ddd'};
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  z-index: 2;
`;

const TimelineNodeLabel = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -25px;
  font-size: 12px;
  font-weight: bold;
  color: #555;
`;

const EmptySpace = styled.div`
  width: 45%;
`;

const CommandCode = styled.pre`
  background-color: #f8f9fa;
  border-radius: 4px;
  padding: 1rem;
  overflow-x: auto;
  border: 1px solid #dee2e6;
  margin: 1rem 0;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  background-color: #2a2a72;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #1a1a62;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const RepoState = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const FileList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const FileItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const FileIcon = styled.span`
  margin-right: 10px;
  color: ${props => props.status === 'modified' ? '#F39C12' : 
    props.status === 'added' ? '#27AE60' : 
    props.status === 'deleted' ? '#E74C3C' : '#3498DB'};
`;

const FilePath = styled.span`
  flex: 1;
`;

const FileStatus = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  background-color: ${props => props.status === 'modified' ? '#FEF9E7' : 
    props.status === 'added' ? '#E9F7EF' : 
    props.status === 'deleted' ? '#FDEDEC' : '#EBF5FB'};
  color: ${props => props.status === 'modified' ? '#F39C12' : 
    props.status === 'added' ? '#27AE60' : 
    props.status === 'deleted' ? '#E74C3C' : '#3498DB'};
`;

const GitTimeMachine = () => {
  // Exemple de données pour la timeline
  const timelineData = [
    {
      id: 1,
      title: 'Initialisation du projet',
      command: 'git init',
      description: 'Création d\'un nouveau dépôt Git.',
      side: 'left',
      files: [
        { path: '.gitignore', status: 'added' },
        { path: 'README.md', status: 'added' }
      ]
    },
    {
      id: 2,
      title: 'Premier commit',
      command: 'git add . && git commit -m "Initial commit"',
      description: 'Ajout des fichiers initiaux et premier commit.',
      side: 'right',
      files: [
        { path: '.gitignore', status: 'unchanged' },
        { path: 'README.md', status: 'unchanged' },
        { path: 'index.html', status: 'added' },
        { path: 'style.css', status: 'added' }
      ]
    },
    {
      id: 3,
      title: 'Création d\'une branche',
      command: 'git branch feature-login && git checkout feature-login',
      description: 'Création et basculement vers une nouvelle branche pour développer la fonctionnalité de connexion.',
      side: 'left',
      files: [
        { path: '.gitignore', status: 'unchanged' },
        { path: 'README.md', status: 'unchanged' },
        { path: 'index.html', status: 'unchanged' },
        { path: 'style.css', status: 'unchanged' }
      ]
    },
    {
      id: 4,
      title: 'Développement de la fonctionnalité',
      command: 'git add login.html login.js && git commit -m "Add login page"',
      description: 'Ajout de la page de connexion et de son JavaScript associé.',
      side: 'right',
      files: [
        { path: '.gitignore', status: 'unchanged' },
        { path: 'README.md', status: 'unchanged' },
        { path: 'index.html', status: 'modified' },
        { path: 'style.css', status: 'modified' },
        { path: 'login.html', status: 'added' },
        { path: 'login.js', status: 'added' }
      ]
    },
    {
      id: 5,
      title: 'Fusion avec la branche principale',
      command: 'git checkout master && git merge feature-login',
      description: 'Retour à la branche principale et fusion de la fonctionnalité de connexion.',
      side: 'left',
      files: [
        { path: '.gitignore', status: 'unchanged' },
        { path: 'README.md', status: 'unchanged' },
        { path: 'index.html', status: 'modified' },
        { path: 'style.css', status: 'modified' },
        { path: 'login.html', status: 'added' },
        { path: 'login.js', status: 'added' }
      ]
    }
  ];
  
  const [currentStep, setCurrentStep] = useState(0);
  
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleNextStep = () => {
    if (currentStep < timelineData.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const goToStep = (step) => {
    setCurrentStep(step);
  };
  
  return (
    <div>
      <RepoState>
        <h3>État du dépôt à l'étape {currentStep + 1}</h3>
        <FileList>
          {timelineData[currentStep].files.map((file, index) => (
            <FileItem key={index}>
              <FileIcon status={file.status}>
                {file.status === 'added' ? '+ ' :
                 file.status === 'modified' ? '~ ' :
                 file.status === 'deleted' ? '- ' : '  '}
              </FileIcon>
              <FilePath>{file.path}</FilePath>
              <FileStatus status={file.status}>
                {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
              </FileStatus>
            </FileItem>
          ))}
        </FileList>
      </RepoState>
    
      <ControlsContainer>
        <Button onClick={handlePrevStep} disabled={currentStep === 0}>
          &lt; Précédent
        </Button>
        <Button onClick={handleNextStep} disabled={currentStep === timelineData.length - 1}>
          Suivant &gt;
        </Button>
      </ControlsContainer>
      
      <TimelineContainer>
        <TimelineLine />
        {timelineData.map((event, index) => (
          <TimelineNodeContainer key={event.id}>
            {event.side === 'left' ? (
              <>
                <TimelineContent style={{opacity: index <= currentStep ? 1 : 0.3}}>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <CommandCode>{event.command}</CommandCode>
                </TimelineContent>
                <TimelineNode 
                  active={index <= currentStep}
                  onClick={() => goToStep(index)}
                />
                <TimelineNodeLabel>Étape {index + 1}</TimelineNodeLabel>
                <EmptySpace />
              </>
            ) : (
              <>
                <EmptySpace />
                <TimelineNode 
                  active={index <= currentStep}
                  onClick={() => goToStep(index)}
                />
                <TimelineNodeLabel>Étape {index + 1}</TimelineNodeLabel>
                <TimelineContent style={{opacity: index <= currentStep ? 1 : 0.3}}>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <CommandCode>{event.command}</CommandCode>
                </TimelineContent>
              </>
            )}
          </TimelineNodeContainer>
        ))}
      </TimelineContainer>
    </div>
  );
};

export default GitTimeMachine;