const dateFormat = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' })

export default function MessageFeed({ status, messages, error, onRetry }) {
  return <section className="feed" aria-label="Messages" aria-busy={status === 'loading'}>
    <div className="sr-only" role="status">{status === 'loading' ? 'Loading messages' : status === 'success' ? `${messages.length} messages loaded` : ''}</div>
    {status === 'idle' && <p className="empty">Choose a channel to join the conversation.</p>}
    {status === 'loading' && <div className="skeletons" aria-hidden="true">{[1, 2, 3].map((id) => <div className="skeleton" key={id}><div /><div /><div /></div>)}</div>}
    {status === 'error' && <div className="empty"><p role="alert">{error}</p><button type="button" onClick={onRetry}>Try again</button></div>}
    {status === 'success' && (messages.length ? <ol className="messages">{messages.map((message) => <li key={message.id}><article><header><span className="avatar" aria-hidden="true">{message.author.slice(0, 1).toUpperCase()}</span><h3>{message.author}</h3><time dateTime={message.createdAt}>{dateFormat.format(new Date(message.createdAt))}</time></header><p>{message.content}</p></article></li>)}</ol> : <div className="empty"><h3>A fresh frequency.</h3><p>No messages yet. Be the first to start a conversation.</p></div>)}
  </section>
}
