import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './blog.css';
import Posts from '../../posts';
import { SocialIcon } from 'react-social-icons';
import { RiShareLine } from 'react-icons/ri';
import Links from '../../socialLinks';

const Blog = () => {
  const { id } = useParams();
  const Found = Posts.find((post) => post.id == id);
  const NotFound = `
  # Sorry, We couldn't find that post
  Check the sidebar to see the available posts.
  `;
  return (
    <>
      <div className="blog">
        <div class="wrapper">
          <article>
            <img
              src={Found ? Found.image : '//placekitten.com/g/800/300'}
              alt="ok"
              draggable={false}
            />
            {Found && (
              <div class="social">
                <RiShareLine size={32} />
                {Links.map((link) => (
                  <SocialIcon url={link.url} key={link.name} />
                ))}
              </div>
            )}
            <ReactMarkdown
              children={Found ? Found.markdown : NotFound}
              remarkPlugins={[remarkGfm]}
            />
          </article>
          <aside>
            <div class="read-more">
              <h3>Read more</h3>
              <ul>
                {Posts.map((post) => {
                  if (id == post.id) return null;
                  return (
                    <Link to={`/blog/${post.id}`}>
                      <li>
                        <img
                          src={post.image}
                          alt="no caption"
                          draggable={false}
                        />
                        <span class="title">{post.title}</span>
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
            <img
              src="//placekitten.com/g/300/300"
              alt="get help"
              draggable={false}
            />
          </aside>
        </div>
      </div>
    </>
  );
};

export default Blog;
