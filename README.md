# 📦 VirtualizedList

A simple virtualized list component that only renders visible rows based on scroll position.  
Supports **any parent height unit** – including `px`, `%`, `vh`, and more.

---

## ⚡ Usage Examples

### 1. Minimal configuration  
Relies on default settings (`containerHeight = 400`, `overscanCount = 5`):
```tsx
<VirtualizedList
  items={items}
  height={48}
  rowRenderer={(item) => <div>{item.name}</div>}
/>
```

### 2. Fixed height passed from parent (in pixels):
```tsx
<div style={{ height: 500 }}>
  <VirtualizedList
    items={items}
    height={48}
    containerHeight={500}
    rowRenderer={(item) => <div>{item.name}</div>}
  />
</div>
```


### 3. Height equal to 100% of parent:
```tsx
<div style={{ height: '100vh' }}>
  <VirtualizedList
    items={items}
    height={48}
    containerHeight="100%"
    rowRenderer={(item) => <div>{item.name}</div>}
  />
</div>
```



🧾 Props

Prop	Type	Description
items	any[]	The list of items to render
height	number	Height of a single row (in pixels)
containerHeight	number | string	Height of the scrollable container. Accepts fixed numbers (400) or any CSS unit ('100%', '50vh', etc.)
overscanCount	number	Extra rows to render above and below the visible range (default: 5)
rowRenderer	(item: any, index: number) => React.ReactNode	Function that renders a row based on the item and index



🧠 Notes
	•	When using a percentage height (containerHeight="100%"), ensure the parent element has a defined height.
	•	Only visible rows are rendered to improve performance.
	•	overscanCount helps reduce flicker or visible blank space when scrolling quickly.
