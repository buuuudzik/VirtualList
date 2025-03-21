const VirtualizedList = ({
  className,
  items,
  height,
  rowRenderer,
  containerHeight = 400,
  overscanCount = 3,
}) => {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = items.length * height;

  const containerHeightIsNumber = typeof containerHeight === "number";

  const [size, setSize] = useState({
    width: 0,
    height: containerHeightIsNumber ? containerHeight : height,
  });

  useEffect(() => {
    // If the container has a fixed height, we don't need to observe it
    if (containerHeightIsNumber) return;

    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width !== size.width || height !== size.height) {
          setSize({ width, height });
        }
      }
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [containerHeightIsNumber]);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  }, []);

  const measuredHeight = size.height || height;

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll, measuredHeight]);

  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / height) - overscanCount
  );

  const visibleItems = [];
  const min = Math.max(0, startIndex - overscanCount);
  const max = Math.min(startIndex + overscanCount, items.length - 1);
  for (let i = min; i < items.length && i <= max && i >= min; i++) {
    const item = items[i];
    visibleItems.push(item);
  }

  const yOffset = startIndex * height;

  return (
    <div
      className={className}
      ref={containerRef}
      style={{
        height: containerHeight,
        overflowY: "auto",
        position: "relative",
        width: "100%",
      }}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            transform: `translateY(${yOffset}px)`,
          }}
        >
          {visibleItems.map((item, index) => (
            <div key={startIndex + index} style={{ height }}>
              {rowRenderer(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
