import React, { useState, useEffect, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { forceCollide, forceRadial, forceManyBody } from "d3-force";
import Player from "@/components/Player/Player"; // ✅ Player 컴포넌트 추가
import Loader from "../Loader/Loader";
import styles from "./ProsNCons.module.scss";

interface ProsNConsProps {
  jsonData: any;
}

const ProsNConas: React.FC<ProsNConsProps> = ({ jsonData }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fgRef = useRef<any>(null);
  const { r, g, b, a } =
    jsonData === "pros"
      ? { r: 0, g: 255, b: 255, a: 0.2 }
      : { r: 255, g: 0, b: 255, a: 0.2 };

  const nodeSize = 30; // ✅ 노드 사이즈를 정의

  const [data, setData] = useState<{ nodes: any[]; links: any[] }>({
    nodes: [],
    links: [],
  });

  const [videoMap, setVideoMap] = useState<{ [key: string]: any }>({});
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // ✅ 리사이즈 이벤트를 `debounce` 처리하여 너무 자주 호출되지 않도록 함
  useEffect(() => {
    if (!containerRef.current) return;

    let resizeTimeout: NodeJS.Timeout;

    const resizeObserver = new ResizeObserver((entries) => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        for (let entry of entries) {
          const { width, height } = entry.contentRect;
          setDimensions({ width, height });
        }
      }, 300); // ✅ 300ms 후에 dimensions 업데이트
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const isMobile = dimensions.width <= 800;
    Promise.all([
      fetch(`/resources/data/${jsonData}.json`).then((res) => res.json()),
      fetch("/resources/data/videoData.json").then((res) => res.json()),
    ])
      .then(([similarityMatrix, videoData]) => {
        setVideoMap(videoData);

        // ✅ 노드를 중심에서 배치
        const nodes = Object.keys(similarityMatrix).map((id, index, arr) => {
          if (isMobile) {
            const cols = 4; // 3열 그리드
            const spacingX = 200;
            const spacingY = 200;
            const row = Math.floor(index / cols);
            const col = index % cols;

            return {
              id,
              group: jsonData,
              x: spacingX * (col + 1),
              y: spacingY * (row + 1),
              fx: spacingX * (col + 1), // 위치 고정
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
      .catch((error) => {
        console.error("❌ 데이터 로드 실패:", error);
        setLoading(false);
      });
  }, [dimensions]); // ✅ 화면 크기가 변경될 때만 실행

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
        forceRadial(maxRadius, centerX, centerY).strength(0.1)
      );

      fgRef.current.d3Force("collision", forceCollide(300));
      setTimeout(() => {
        isMobile
          ? fgRef.current.zoomToFit(1000, 20)
          : fgRef.current.zoomToFit(1000, 80);
      }, 500); // ✅ 초기화 후 약간의 딜레이를 줘서 안정적으로 배치
    }
  }, [data, dimensions]); // ✅ 화면 크기가 변경될 때 반경 업데이트

  // ✅ 노드 클릭 시 비디오 모달 팝업
  const handleNodeClick = (node: any) => {
    console.log(`🔎 클릭된 노드 ID: ${node.id}`);
    console.log("🔎 현재 저장된 비디오 맵 키 목록: ", Object.keys(videoMap));

    const videoInfo = videoMap[node.id];

    if (!videoInfo) {
      console.error(`❌ 해당 노드(${node.id})에 대한 비디오 정보가 없습니다.`);
      return;
    }

    if (typeof videoInfo === "object" && !Array.isArray(videoInfo)) {
      setSelectedNode({ ...videoInfo, key: node.id });
    } else {
      console.error(
        `❌ 비디오 정보(${node.id})가 객체 형태가 아닙니다.`,
        videoInfo
      );
      return;
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
              const opacity = node.opacity || 1;
              const color = `rgb(${r}, ${g}, ${b})`; // ✅ 네온 효과
              const glowColor = `rgba(${r}, ${g}, ${b}, 0.80)`; // ✅ Glow 효과

              ctx.shadowBlur = 15; // ✅ 그림자 효과
              ctx.shadowColor = "#000";
              ctx.fillStyle = color;
              ctx.strokeStyle = glowColor;
              // ctx.lineWidth = 0.2;

              ctx.beginPath();
              ctx.arc(node.x!, node.y!, nodeSize, 0, 2 * Math.PI, false);
              ctx.fill();
              ctx.stroke();
              ctx.shadowBlur = 0;

              ctx.font = `${12 / globalScale}px Sans-Serif`;
              ctx.textAlign = "center"; // 수평 중앙 정렬
              ctx.textBaseline = "bottom"; // 수직 정렬을 아래로 설정
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
                  node.y! + nodeSize + 5 + lineHeight
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
            } // ✅ 링크 색상
            nodeRelSize={nodeSize + 20}
            onNodeClick={handleNodeClick}
          />

          {/* ✅ Player 컴포넌트 사용 */}
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
