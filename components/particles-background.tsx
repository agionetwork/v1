"use client";

import { useEffect, useState, useRef } from "react";

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const scrollRef = useRef(0);

  useEffect(() => {
    setMounted(true);
    console.log("ParticlesBackground montado - efeito de rede blockchain");

    let animationFrameId: number;
    let nodes: Array<{x: number, y: number, vx: number, vy: number, originX: number, originY: number, size: number}> = [];
    const nodeCount = 100; // Aumentado para 100 pontos
    const maxDistance = 180; // Aumentado para mais conexões
    const baseNodeSize = 1.8; // Tamanho base para os nós
    const mouseInfluenceRadius = 180; // Raio de influência do mouse aumentado
    const mouseForce = 4; // Força da influência do mouse aumentada
    const scrollInfluence = 0.3; // Influência do scroll
    const velocityFactor = 0.5; // Fator de velocidade para o movimento dos nós
    
    // Configurar canvas quando componente montar
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajustar o tamanho do canvas para preencher o container
    const adjustSize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    // Executar no montagem e ao redimensionar
    adjustSize();
    window.addEventListener('resize', adjustSize);

    // Distribuição mais uniforme dos nós para cobrir toda a área
    const gridSize = Math.ceil(Math.sqrt(nodeCount));
    const cellWidth = canvas.width / gridSize;
    const cellHeight = canvas.height / gridSize;

    for (let i = 0; i < nodeCount; i++) {
      // Posicionamento semi-aleatório em uma grade para melhor cobertura
      const gridX = i % gridSize;
      const gridY = Math.floor(i / gridSize);
      
      const x = gridX * cellWidth + Math.random() * cellWidth;
      const y = gridY * cellHeight + Math.random() * cellHeight;
      
      nodes.push({
        x: x,
        y: y,
        originX: x, // Posição original para retorno
        originY: y, // Posição original para retorno
        vx: (Math.random() - 0.5) * velocityFactor, // Velocidade aleatória
        vy: (Math.random() - 0.5) * velocityFactor, // para movimento mais dinâmico
        size: baseNodeSize + Math.random() * 0.8 // Tamanho variável para mais dinamismo
      });
    }

    // Eventos de mouse com efeito de inércia
    let mouseX = 0;
    let mouseY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      lastMouseX = mouseX;
      lastMouseY = mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    // Evento de scroll
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);

    // Função de animação
    const animate = () => {
      if (!canvas || !ctx) return;
      
      // Limpar canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calcular velocidade do mouse para efeitos mais dinâmicos
      const mouseVelocityX = mouseX - lastMouseX;
      const mouseVelocityY = mouseY - lastMouseY;
      const mouseSpeed = Math.sqrt(mouseVelocityX * mouseVelocityX + mouseVelocityY * mouseVelocityY);
      
      // Aplicar efeito de parallax com o scroll
      const scrollOffset = scrollRef.current * scrollInfluence;
      
      // Desenhar conexões
      ctx.lineWidth = 0.8; // Linhas mais finas
      
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        
        // Atualizar posição do nó com movimento normal
        nodeA.x += nodeA.vx;
        nodeA.y += nodeA.vy;
        
        // Aplicar efeito de scroll - movendo os nós para cima conforme scroll desce
        const targetY = nodeA.originY - scrollOffset;
        nodeA.y += (targetY - nodeA.y) * 0.03;
        
        // Aplicar influência do mouse se estiver ativo
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - nodeA.x;
          const dy = mouseRef.current.y - nodeA.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouseInfluenceRadius) {
            // Determinar direção e força com base na velocidade do mouse
            const force = (mouseInfluenceRadius - distance) / mouseInfluenceRadius;
            
            // Fator adicional baseado na velocidade do mouse
            const speedFactor = 1 + (mouseSpeed * 0.05);
            
            // Adicionar um efeito de "empurrão" na direção do movimento do mouse
            const pushFactor = 0.02;
            
            // Repelir - nós se afastam do cursor
            nodeA.x -= dx * force * 0.02 * mouseForce * speedFactor;
            nodeA.y -= dy * force * 0.02 * mouseForce * speedFactor;
            
            // Adicionar componente de velocidade baseado no movimento do mouse
            nodeA.vx -= mouseVelocityX * pushFactor * force;
            nodeA.vy -= mouseVelocityY * pushFactor * force;
            
            // Limitar velocidade máxima para evitar instabilidade
            const maxVelocity = 3;
            const currentVel = Math.sqrt(nodeA.vx * nodeA.vx + nodeA.vy * nodeA.vy);
            if (currentVel > maxVelocity) {
              nodeA.vx = (nodeA.vx / currentVel) * maxVelocity;
              nodeA.vy = (nodeA.vy / currentVel) * maxVelocity;
            }
          }
        }
        
        // Aplicar amortecimento na velocidade
        nodeA.vx *= 0.98;
        nodeA.vy *= 0.98;
        
        // Força suave para retornar à posição original - mais forte quanto mais longe estiver
        const distFromOrigin = Math.sqrt(
          Math.pow(nodeA.x - nodeA.originX, 2) + 
          Math.pow(nodeA.y - nodeA.originY, 2)
        );
        
        const returnStrength = 0.002 + (distFromOrigin * 0.00005);
        nodeA.x += (nodeA.originX - nodeA.x) * returnStrength;
        nodeA.y += (nodeA.originY - nodeA.y) * returnStrength;
        
        // Reverter direção se atingir a borda
        if (nodeA.x <= 0 || nodeA.x >= canvas.width) nodeA.vx *= -1;
        if (nodeA.y <= 0 || nodeA.y >= canvas.height) nodeA.vy *= -1;
        
        // Desenhar conexões com outros nós
        let connections = 0;
        const maxConnections = 3; // Limitar conexões por nó para melhor desempenho
        
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance && connections < maxConnections) {
            // Quanto mais próximo, mais opaca é a linha
            const opacity = 1 - distance / maxDistance;
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.4})`;
            
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
            
            connections++;
          }
        }
      }
      
      // Desenhar nós
      for (const node of nodes) {
        // Adicionar variação suave de tamanho para efeito de pulsação
        const pulseAmount = Math.sin(Date.now() * 0.002 + node.x * 0.01) * 0.2;
        const finalSize = node.size + pulseAmount;
        
        ctx.fillStyle = '#3b82f6'; // Azul
        ctx.beginPath();
        ctx.arc(node.x, node.y, finalSize, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Definir última posição do mouse para cálculo de velocidade
      lastMouseX = mouseX;
      lastMouseY = mouseY;
      
      // Continuar animação
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Iniciar animação
    animate();
    
    // Limpar quando componente desmontar
    return () => {
      window.removeEventListener('resize', adjustSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted]);

  if (!mounted) return null;
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 -z-10 w-full h-full"
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
    />
  );
} 