import React, { Component } from "react";
import * as d3 from "d3";

class Animation extends Component {

  componentDidMount() {

    const data = [
        { name: "Medellín", index2005: 3, index2006: 33 },
        { name: "Cali", index2005: 39, index2006: 45 },
        { name: "Bogotá", index2005: 7, index2006: 31 },
        { name: "Pereira", index2005: 35, index2006: 36 },
        { name: "Bucaramanga", index2005: 16, index2006: 23 },
        { name: "Cúcuta", index2005: 45, index2006: 45 },
        { name: "Armenia", index2005: 6, index2006: 16 }
    ];
    this.drawChart(data);
  }

  drawChart(data) {

    const width = 1000;
    const height = 700;
    const margin = {top:10, left: 50, bottom: 40, right:10};
    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top - margin.bottom;

    const canvas = d3.select("#canvas");

    const svg = canvas.append("svg")
      .attr("width", width)
      .attr("height", height);
  
    let g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);
  
    const x = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, iwidth])
      .padding(0.1)
  
    const y = d3.scaleLinear()
      .domain([50, 0])
      .range([0, iheight])
  
    const indices = g.selectAll("rect").data(data);
  
    function make_y_gridlines() {
      return d3.axisLeft(y).ticks(10);
    }
    
    g.append("g")
      .attr("class", "grid")
      .call(make_y_gridlines().tickSize(-iwidth).tickFormat(""));
  
    indices.enter()
      .append("rect")
      .attr("id", d => d.name)
      .attr("class", "bar")
      .style("fill", "steelblue")
      .attr("x", d => x(d.name))
      .attr("y", d => y(d.index2005))
      .attr("height", d=> iheight - y(d.index2005) )
      .attr("width", d => x.bandwidth() )
  
    g.append("g")
        .classed("x--axis", true)
        .call(d3.axisBottom(x))
        .attr("transform", `translate(0, ${iheight})`); 
  
    g.append("g")
      .classed("y--axis", true)
      .call(d3.axisLeft(y))
  
    const btn2005 = canvas.append("button").text("2005")
    const btn2006 = canvas.append("button").text("2006")
    
    d3.select("#graficar").remove();
  
    btn2005.on("click", () => {
      data.forEach(function(x) {
  
        if (x.index2006 > x.index2005){
          d3.select(`#${x.name}`).transition()
          .attr("height", iheight - y(x.index2005))
          .attr("y", y(x.index2005))
          .style("fill", "steelblue")
          .duration(1000)
          .ease(d3.easeBounce)
        }
        else {
          d3.select(`#${x.name}`).transition()
          .attr("height", iheight - y(x.index2005))
          .attr("y", y(x.index2005))
          .style("fill", "steelblue")
          .duration(1000)
        }
  
        
      })
    })
  
    btn2006.on("click", () => {
      data.forEach(function(x) {
  
        if (x.index2005 > x.index2006){
          d3.select(`#${x.name}`).transition()
          .attr("height", iheight - y(x.index2006))
          .attr("y", y(x.index2006))
          .style("fill", "#69b3a2")
          .duration(1000)
          .ease(d3.easeBounce)
        }
        else{
          d3.select(`#${x.name}`).transition()
          .attr("height", iheight - y(x.index2006))
          .attr("y", y(x.index2006))
          .style("fill", "#69b3a2")
          .duration(1000)
        }
      })
    })
  }

  render() {
    return <div id="canvas"></div>;
  }
}

export default Animation;