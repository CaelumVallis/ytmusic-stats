const Stats = ({ list }) => {
  return (
    <ul>
      {list.map(item => <li key={item.title + new Date()}>{item.title} - {item.artist}</li>)}
    </ul>
  )
}

export default Stats;