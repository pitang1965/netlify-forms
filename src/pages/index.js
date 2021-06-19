import React, { useState } from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import Layout from '../components/layout';
import Seo from '../components/seo';

const IndexPage = () => {
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
    <Layout>
      <Seo title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <StaticImage
        src="../images/gatsby-astronaut.png"
        width={300}
        quality={95}
        formats={['AUTO', 'WEBP', 'AVIF']}
        alt="A Gatsby astronaut"
        style={{ marginBottom: `1.45rem` }}
      />

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
      <p>
        <Link to="/page-2/">Go to page 2</Link> <br />
        <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
      </p>
    </Layout>
  );
};

export default IndexPage;
