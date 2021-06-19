import React, { useState } from 'react';

function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
      )
      .join('&');
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...formState }),
    })
      .then(() => alert('メールを送信しました。'))
      .catch((error) => alert(error));

    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      name="contact"
      method="post"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="contact" />
      <label htmlFor="name">名前</label>
      <input
        id="name"
        type="text"
        name="name"
        onChange={handleChange}
        value={formState.name}
        placeholder="名前を入力してください。"
      />
      <label htmlFor="email">メールアドレス</label>
      <input
        id="email"
        type="email"
        name="email"
        onChange={handleChange}
        value={formState.email}
        placeholder="メールアドレスを入力してください。"
      />
      <label htmlFor="message">メッセージ</label>
      <textarea
        id="message"
        name="message"
        value={formState.message}
        onChange={handleChange}
        placeholder="メッセージを入力してください。"
      />
      <button type="submit">送信</button>
    </form>
  );
}

export default ContactForm;
