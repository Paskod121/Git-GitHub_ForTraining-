import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

const VisualizerContainer = styled.div`
  height: 500px;
  width: 100%;
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const ControlsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background-color: #2a2a72;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #1a1a62;
  }
`;

const GitBranchVisualizer = () => {
  const svgRef = useRef(null);
  
  // Données d'exemple pour un historique Git
  const initialCommits = [
    { id: 'a', message: 'Initial commit', branch: 'master', time: 0 },
    { id: 'b', message: 'Add README', branch: 'master', time: 1, parent: 'a' },
    { id: 'c', message: 'Create basic structure', branch: 'master', time: 2, parent: 'b' },
    { id: 'd', message: 'Implement feature X', branch: 'feature', time: 3, parent: 'c' },
    { id: 'e', message: 'Fix bug in master', branch: 'master', time: 3, parent: 'c' },
    { id: 'f', message: 'Continue feature X', branch: 'feature', time: 4, parent: 'd' },
    { id: 'g', message: 'Merge bug fix to feature', branch: 'feature', time: 5, parent: 'f', mergeParent: 'e' }
  ];
  
  const [commits, setCommits] = React.useState(initialCommits);
  
  // Fonction pour ajouter un commit
  const addCommit = () => {
    const newCommit = {
      id: Math.random().toString(36).substring(2, 6),
      message: `New commit ${Math.floor(Math.random() * 100)}`,
      branch: Math.random() > 0.5 ? 'master' : 'feature',
      time: Math.max(...commits.map(c => c.time)) + 1,
      parent: commits[commits.length - 1].id
    };
    
    setCommits([...commits, newCommit]);
  };
  
  // Fonction pour créer une branche
  const createBranch = () => {
    const lastCommit = commits[commits.length - 1];
    const newBranchName = `branch-${Math.floor(Math.random() * 100)}`;
    
    const newCommit = {
      id: Math.random().toString(36).substring(2, 6),
      message: `Create branch ${newBranchName}`,
      branch: newBranchName,
      time: lastCommit.time + 1,
      parent: lastCommit.id
    };
    
    setCommits([...commits, newCommit]);
  };
  
  // Fonction pour fusionner les branches
  const mergeBranches = () => {
    const branches = [...new Set(commits.map(c => c.branch))];
    if (branches.length < 2) return;
    
    const lastCommitsByBranch = {};
    commits.forEach(commit => {
      lastCommitsByBranch[commit.branch] = commit;
    });
    
    // Choisissez deux branches au hasard
    const sourceBranch = branches[Math.floor(Math.random() * branches.length)];
    let targetBranch;
    do {
      targetBranch = branches[Math.floor(Math.random() * branches.length)];
    } while (targetBranch === sourceBranch);
    
    const newCommit = {
      id: Math.random().toString(36).substring(2, 6),
      message: `Merge ${sourceBranch} into ${targetBranch}`,
      branch: targetBranch,
      time: Math.max(...commits.map(c => c.time)) + 1,
      parent: lastCommitsByBranch[targetBranch].id,
      mergeParent: lastCommitsByBranch[sourceBranch].id
    };
    
    setCommits([...commits, newCommit]);
  };
  
  // Fonction pour réinitialiser
  const reset = () => {
    setCommits(initialCommits);
  };
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Trouver toutes les branches uniques
    const branches = [...new Set(commits.map(c => c.branch))];
    
    // Créer une échelle pour les branches (axe y)
    const yScale = d3.scaleBand()
      .domain(branches)
      .range([0, innerHeight])
      .padding(0.4);
    
    // Créer une échelle pour le temps (axe x)
    const timeMax = Math.max(...commits.map(c => c.time));
    const xScale = d3.scaleLinear()
      .domain([0, timeMax])
      .range([0, innerWidth]);
    
    // Dessiner les lignes de branche
    branches.forEach(branch => {
      g.append("line")
        .attr("x1", xScale(0))
        .attr("y1", yScale(branch) + yScale.bandwidth() / 2)
        .attr("x2", xScale(timeMax))
        .attr("y2", yScale(branch) + yScale.bandwidth() / 2)
        .attr("stroke", "#ddd")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "4");
    });
    
    // Dessiner les commits
    const commitGroups = g.selectAll(".commit")
      .data(commits)
      .enter()
      .append("g")
      .attr("class", "commit")
      .attr("transform", d => `translate(${xScale(d.time)}, ${yScale(d.branch) + yScale.bandwidth() / 2})`);
    
    // Cercles pour les commits
    commitGroups.append("circle")
      .attr("r", 10)
      .attr("fill", d => {
        if (d.mergeParent) return "#8E44AD"; // Commit de fusion en violet
        return d.branch === "master" ? "#2a2a72" : "#27AE60"; // Master en bleu, feature en vert
      });
    
    // ID des commits
    commitGroups.append("text")
      .attr("y", -15)
      .attr("text-anchor", "middle")
      .text(d => d.id)
      .attr("font-size", "10px")
      .attr("fill", "#555");
    
    // Dessiner les lignes entre les commits
    commits.forEach(commit => {
      if (commit.parent) {
        const parent = commits.find(c => c.id === commit.parent);
        if (parent) {
          g.append("path")
            .attr("d", d3.linkHorizontal()
              .source(() => [xScale(parent.time), yScale(parent.branch) + yScale.bandwidth() / 2])
              .target(() => [xScale(commit.time), yScale(commit.branch) + yScale.bandwidth() / 2]))
            .attr("fill", "none")
            .attr("stroke", "#666")
            .attr("stroke-width", 2);
        }
      }
      
      // Lignes pour les fusions
      if (commit.mergeParent) {
        const mergeParent = commits.find(c => c.id === commit.mergeParent);
        if (mergeParent) {
          g.append("path")
            .attr("d", d3.linkHorizontal()
              .source(() => [xScale(mergeParent.time), yScale(mergeParent.branch) + yScale.bandwidth() / 2])
              .target(() => [xScale(commit.time), yScale(commit.branch) + yScale.bandwidth() / 2]))
            .attr("fill", "none")
            .attr("stroke", "#8E44AD")
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "4");
        }
      }
    });
    
    // Étiquettes pour les branches
    g.selectAll(".branch-label")
      .data(branches)
      .enter()
      .append("text")
      .attr("class", "branch-label")
      .attr("x", -10)
      .attr("y", d => yScale(d) + yScale.bandwidth() / 2)
      .attr("text-anchor", "end")
      .attr("dominant-baseline", "middle")
      .attr("font-weight", "bold")
      .text(d => d)
      .attr("fill", d => d === "master" ? "#2a2a72" : "#27AE60");
    
  }, [commits]);
  
  return (
    <>
      <ControlsContainer>
        <Button onClick={addCommit}>+ Commit</Button>
        <Button onClick={createBranch}>+ Branch</Button>
        <Button onClick={mergeBranches}>Merge</Button>
        <Button onClick={reset}>Reset</Button>
      </ControlsContainer>
      <VisualizerContainer>
        <svg ref={svgRef} width="100%" height="100%"></svg>
      </VisualizerContainer>
    </>
  );
};

export default GitBranchVisualizer;