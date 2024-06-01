/**import { Component } from '@angular/core';
//import { Model, ModelElementDetail } from '../shared/model';
//import { Node, Edge, Connection, addEdge } from 'reactflow';
//import nodeTypes from '../shared/custom-nodes'; // Adjust the import path as necessary

@Component({
  selector: 'app-modelling-environment',
  templateUrl: './modelling-environment.component.html',
  styleUrls: ['./modelling-environment.component.css']
})
export class ModellingEnvironmentComponent {

  model: Model;
  nodeTypes = nodeTypes;

  constructor() {
    this.model = new Model('1', 'Default Model');
  }

  addNode(element: ModelElementDetail) {
    this.model.addNode(element);
  }

  onNodesChange(event: { nodes: any[] }) {
    const nodes = event.nodes;
    nodes.forEach((node: any) => {
      this.model.updateNodePosition(node.id, node.position);
    });
  }


  onEdgesChange(event: any) {
    this.model.edges = event.edges;
  }
}
*/
import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import { Node, Edge, Connection, MarkerType } from 'reactflow';

@Component({
  selector: 'app-modelling-environment',
  templateUrl: './modelling-environment.component.html',
  styleUrls: ['./modelling-environment.component.css']
})
export class ModellingEnvironmentComponent {
  nodes: Node[] = [];
  edges: Edge[] = [];


  constructor() {
  }

  handleAddNode(node: Node) {
    this.nodes = [...this.nodes, node];
  }

  handleAddEdge(edge: Edge) {
    this.edges = [...this.edges, edge];
  }

  handleNodesChange(updatedNodes: Node[]) {
    this.nodes = updatedNodes;
  }

  handleEdgesChange(updatedEdges: Edge[]) {
    this.edges = updatedEdges;
  }
  onAddNode(node: Node) {
    this.nodes = [...this.nodes, node];
  }
  onAddEdge(edge: Edge) {
    this.edges = [...this.edges, edge];
  }
  handleConnect(connection: Connection) {
    if (connection.source && connection.target) {
      const newEdge: Edge = {
        id: `${connection.source}-${connection.target}`,
        source: connection.source,
        target: connection.target,
        label: 'this is an edge label',
        markerEnd: {type: MarkerType.ArrowClosed},
      };
      this.edges = [...this.edges, newEdge];
    }
}

  ngOnInit() {}
}
  /**nodes: Node[] = [];
  edges: Edge[] = [];

  onAddNode(node: Node) {
    this.nodes = [...this.nodes, node];
  }

  handleNodesChange(updatedNodes: Node[]) {
    this.nodes = updatedNodes;
  }

  handleEdgesChange(updatedEdges: Edge[]) {
    this.edges = updatedEdges;
  }

  handleConnect(connection: Connection) {
    if (connection.source && connection.target) {
      const newEdge: Edge = {
        id: `${connection.source}-${connection.target}`,
        source: connection.source,
        target: connection.target,
        label: 'this is an edge label'
      };
      this.edges = [...this.edges, newEdge];
    }
    */

  /**
  nodes: Node[] = [];
  edges: Edge[] = [];
  @Output() connect = new EventEmitter<Connection>();

  handleNodesChange(updatedNodes: Node[]) {
    this.nodes = updatedNodes;
  }
  handleEdgesChange(updatedEdges: Edge[]) {
    this.edges = updatedEdges;
  }
  onAddNode(node: Node) {
    this.nodes = [...this.nodes, node];
  }
  onConnect(event: Connection) {
    this.connect.emit(event);
  }*/

  /*//////Recent works
  onNodesChange(nodes: Node[]) {
    this.nodes = nodes;
  }

  onEdgesChange(edges: Edge[]) {
    this.edges = edges;
  }*/



  /*
  edges: Edge[] = [];

  onAddNode(newNode: Node) {
    this.nodes = [...this.nodes, newNode];
  }

  nodes: any[] = [];

  handleAddNode(node: any) {
    this.nodes.push(node);
  }
*/

