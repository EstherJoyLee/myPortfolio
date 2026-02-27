import React, { useState, useEffect, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { forceCollide, forceRadial, forceManyBody } from "d3-force";
import Player from "@/components/Player/Player";
import Loader from "../Loader/Loader";

interface ProsNConsProps {
  jsonData: any;
}

const ProsNConas: React.FC<ProsNConsProps> = ({ jsonData }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fgRef = useRef<any>(null);

  const { r, g, b } =
    jsonData === "pros" ? { r: 0, g: 255, b: 255 } : { r: 255, g: 0, b: 255 };

  const nodeSize = 30;

  const [data, setData] = useState<{ nodes: any[]; links: any[] }>({
    nodes: [],
    links: [],
  });

  const [videoMap, setVideoMap] = useState<{ [key: string]: any }>({});
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1280,
    height: typeof window !== "undefined" ? window.innerHeight : 720,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    let resizeTimeout: NodeJS.Timeout;

    const resizeObserver = new ResizeObserver((entries) => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          setDimensions({ width, height });
        }
      }, 300);
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      clearTimeout(resizeTimeout);
      resizeObserver.disconnect();
    };
  }, []);

  // ✅ jsonData 의존성 추가
  useEffect(() => {
    const isMobile = dimensions.width <= 800;
    setLoading(true);

    Promise.all([
      fetch(`/resources/data/${jsonData}.json`).then((res) => res.json()),
      fetch("/resources/data/videoData.json").then((res) => res.json()),
    ])
      .then(([similarityMatrix, videoData]) => {
        setVideoMap(videoData);

        const nodes = Object.keys(similarityMatrix).map((id, index, arr) => {
          if (isMobile) {
            const cols = 4;
            const spacingX = 200;
            const spacingY = 200;
            const row = Math.floor(index / cols);
            const col = index % cols;

            return {
              id,
              group: jsonData,
              x: spacingX * (col + 1),
              y: spacingY * (row + 1),
              fx: spacingX * (col + 1),
              fy: spacingY * (row + 1),
            };
          } else {
            const centerX = dimensions.width / 2;
            const centerY = dimensions.height / 2;
            return {
              id,
              group: jsonData,
              x:
                centerX +
                (Math.cos((index / arr.length) * 2 * Math.PI) * centerX) / 3,
              y:
                centerY +
                (Math.sin((index / arr.length) * 2 * Math.PI) * centerY) / 3,
            };
          }
        });

        const links: any[] = [];
        Object.entries(similarityMatrix).forEach(([source, targets]) => {
          Object.entries(targets as any).forEach(([target, weight]) => {
            if (typeof weight === "number" && weight > 0.8) {
              links.push({ source, target, weight: weight * 0.5 });
            }
          });
        });

        setData({ nodes, links });
        setLoading(false);
      })
      .catch((_error) => {
        setLoading(false);
      });
  }, [dimensions, jsonData]); // ✅ 수정

  useEffect(() => {
    const isMobile = dimensions.width <= 800;

    if (fgRef.current) {
      fgRef.current.d3Force("charge", forceManyBody().strength(0));
      fgRef.current.d3Force("center", null);

      const maxRadius = Math.min(dimensions.width, dimensions.height) / 2.0;
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;

      fgRef.current.d3Force(
        "radial",
        forceRadial(maxRadius, centerX, centerY).strength(0.1),
      );

      fgRef.current.d3Force("collision", forceCollide(300));

      setTimeout(() => {
        if (!fgRef.current) return;
        isMobile
          ? fgRef.current.zoomToFit(1000, 20)
          : fgRef.current.zoomToFit(1000, 80);
      }, 500);
    }
  }, [data, dimensions]);

  const handleNodeClick = (node: any) => {
    const videoInfo = videoMap[node.id];
    if (!videoInfo) return;

    if (typeof videoInfo === "object" && !Array.isArray(videoInfo)) {
      setSelectedNode({ ...videoInfo, key: node.id });
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <span>👆🏻 Click Node!!</span>
      {loading ? (
        <Loader fullscreen />
      ) : (
        <>
          <ForceGraph2D
            ref={fgRef}
            width={dimensions.width}
            height={dimensions.height}
            graphData={data}
            enableNodeDrag={true}
            nodeCanvasObjectMode={() => "after"}
            nodeCanvasObject={(node, ctx, globalScale) => {
              const label = node.id;
              // ✅ 삭제: const opacity = node.opacity || 1;
              const color = `rgb(${r}, ${g}, ${b})`;
              const glowColor = `rgba(${r}, ${g}, ${b}, 0.80)`;

              ctx.shadowBlur = 15;
              ctx.shadowColor = "#000";
              ctx.fillStyle = color;
              ctx.strokeStyle = glowColor;

              ctx.beginPath();
              ctx.arc(node.x!, node.y!, nodeSize, 0, 2 * Math.PI, false);
              ctx.fill();
              ctx.stroke();
              ctx.shadowBlur = 0;

              ctx.font = `${12 / globalScale}px Sans-Serif`;
              ctx.textAlign = "center";
              ctx.textBaseline = "bottom";
              ctx.fillStyle = "white";

              const words = label.split(" ");
              let line1 = label;
              let line2 = "";

              if (words.length > 1) {
                const middle = Math.ceil(words.length / 2);
                line1 = words.slice(0, middle).join(" ");
                line2 = words.slice(middle).join(" ");
              }

              const lineHeight = 14 / globalScale;
              ctx.fillText(line1, node.x!, node.y! + nodeSize + 5);
              if (line2) {
                ctx.fillText(
                  line2,
                  node.x!,
                  node.y! + nodeSize + 5 + lineHeight,
                );
              }
            }}
            linkDirectionalArrowLength={4}
            linkDirectionalArrowRelPos={1}
            linkWidth={(link) => link.weight}
            linkColor={(link) =>
              link.weight > 4
                ? `rgba(${r}, ${g}, ${b}, 0.1)`
                : link.weight > 3
                  ? `rgba(${r}, ${g}, ${b}, 0.3)`
                  : `rgba(${r}, ${g}, ${b}, 0.6)`
            }
            nodeRelSize={nodeSize + 20}
            onNodeClick={handleNodeClick}
          />

          {selectedNode && (
            <Player
              prosNcons={selectedNode.key}
              videoId={selectedNode.videoId}
              timestamp={selectedNode.timestamp}
              isPortrait={selectedNode.isPortrait}
              onClose={() => setSelectedNode(null)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProsNConas;
