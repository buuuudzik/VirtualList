# VirtualList
Simple virtualized list which support parent height 100%

```js
<VirtualizedList
  items={allItems}
  containerHeight="100%"
  height={400}
  rowRenderer={(row) => (
    <div key={row.id}>{row.name}</div>
  )}
/>
```
