import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import styled from 'styled-components';

const TerminalContainer = styled.div`
  height: 400px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  margin-bottom: 1.5rem;
`;

const GitTerminal = () => {
  const terminalRef = useRef(null);
  const terminal = useRef(null);
  const fitAddon = useRef(null);
  const commandHistory = useRef([]);
  const historyIndex = useRef(-1);
  const currentInput = useRef('');

  const processCommand = (command) => {
    if (!command) return;
    
    terminal.current.writeln('');
    
    // Historique des commandes
    commandHistory.current.push(command);
    historyIndex.current = commandHistory.current.length;
    
    // Traitement des commandes simple
    if (command === 'clear') {
      terminal.current.clear();
    } else if (command === 'help') {
      terminal.current.writeln('Commandes disponibles:');
      terminal.current.writeln('  help - Affiche cette aide');
      terminal.current.writeln('  clear - Efface le terminal');
      terminal.current.writeln('  init - Simule git init');
      terminal.current.writeln('  status - Simule git status');
      terminal.current.writeln('  add <file> - Simule git add');
      terminal.current.writeln('  commit -m "<message>" - Simule git commit');
    } else if (command === 'init') {
      terminal.current.writeln('Initialized empty Git repository in /sandbox/.git/');
    } else if (command === 'status') {
      terminal.current.writeln('On branch master');
      terminal.current.writeln('No commits yet');
      terminal.current.writeln('nothing to commit (create/copy files and use "git add" to track)');
    } else if (command.startsWith('add ')) {
      const file = command.substring(4);
      terminal.current.writeln(`Added file '${file}' to staging area.`);
    } else if (command.startsWith('commit -m ')) {
      const message = command.match(/"([^"]*)"/);
      if (message) {
        terminal.current.writeln(`[master (root-commit) abcd123] ${message[1]}`);
        terminal.current.writeln('1 file changed, 10 insertions(+)');
        terminal.current.writeln('create mode 100644 file.txt');
      } else {
        terminal.current.writeln('Error: Commit message required. Use: commit -m "Your message"');
      }
    } else {
      terminal.current.writeln(`git: '${command}' n'est pas une commande git. Essayez 'help'.`);
    }
    
    terminal.current.write('\r\n$ ');
  };

  useEffect(() => {
    // Initialisation du terminal
    terminal.current = new Terminal({
      cursorBlink: true,
      theme: {
        background: '#1E1E1E',
        foreground: '#F8F8F8',
        cursor: '#F8F8F8'
      }
    });
    
    fitAddon.current = new FitAddon();
    terminal.current.loadAddon(fitAddon.current);
    
    terminal.current.open(terminalRef.current);
    fitAddon.current.fit();
    
    terminal.current.writeln('Git Commands Hub - Terminal interactif');
    terminal.current.writeln('Tapez "help" pour voir les commandes disponibles.');
    terminal.current.writeln('');
    terminal.current.write('$ ');
    
    // Gestionnaire d'entrée
    let currentCommand = '';
    
    terminal.current.onKey(({ key, domEvent }) => {
      const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;
      
      // Touche Entrée
      if (domEvent.keyCode === 13) {
        processCommand(currentCommand);
        currentCommand = '';
      }
      // Touche Retour arrière
      else if (domEvent.keyCode === 8) {
        if (currentCommand.length > 0) {
          currentCommand = currentCommand.slice(0, -1);
          terminal.current.write('\b \b');
        }
      }
      // Flèche haut (historique)
      else if (domEvent.keyCode === 38) {
        if (historyIndex.current > 0) {
          if (historyIndex.current === commandHistory.current.length) {
            currentInput.current = currentCommand;
          }
          
          historyIndex.current -= 1;
          
          // Effacer la ligne actuelle
          terminal.current.write('\r' + '$ ' + ' '.repeat(currentCommand.length) + '\r' + '$ ');
          
          currentCommand = commandHistory.current[historyIndex.current];
          terminal.current.write(currentCommand);
        }
      }
      // Flèche bas (historique)
      else if (domEvent.keyCode === 40) {
        if (historyIndex.current < commandHistory.current.length) {
          historyIndex.current += 1;
          
          // Effacer la ligne actuelle
          terminal.current.write('\r' + '$ ' + ' '.repeat(currentCommand.length) + '\r' + '$ ');
          
          if (historyIndex.current === commandHistory.current.length) {
            currentCommand = currentInput.current;
          } else {
            currentCommand = commandHistory.current[historyIndex.current];
          }
          
          terminal.current.write(currentCommand);
        }
      }
      // Caractères imprimables
      else if (printable) {
        currentCommand += key;
        terminal.current.write(key);
      }
    });
    
    // Redimensionnement
    const handleResize = () => {
      fitAddon.current.fit();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      terminal.current.dispose();
    };
  }, []);
  
  return <TerminalContainer ref={terminalRef} />;
};

export default GitTerminal;