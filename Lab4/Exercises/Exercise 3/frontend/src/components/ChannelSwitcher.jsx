export default function ChannelSwitcher({ channels, active, onSelect }) {
  return <nav aria-label="Discussion channels"><ul className="channels">{channels.map((channel) =>
    <li key={channel.id}><button type="button" aria-current={active === channel.id ? 'page' : undefined} onClick={() => onSelect(channel.id)}><span className="channel-number">{channel.number}</span><span><strong>{channel.name}</strong><small>{channel.topic}</small></span><span aria-hidden="true">↗</span></button></li>,
  )}</ul></nav>
}
