import forward from '../../../../images/forward.png';
import { Link } from 'react-router-dom';
import Userphoto from '../../Userphoto/Userphoto';
import ReactTimeAgo from 'react-time-ago';

const Notification = ({ username, notice, quotesId, date }) => {
	return (
		<article className='flex justify-between w-100 bb b--black-05 pb2 mt2' href='#0'>
			<div className='flex items-center'>
				<div className='dtc w3 v-mid'>
					<Link to={`/${username}`}>
						<Userphoto username={username} />
					</Link>
				</div>
				<div className='dtc v-mid pl3'>
					<h1 className='f7 f5-ns fw6 lh-title light-green mv0'>{notice}</h1>
					<div>
						<ReactTimeAgo date={new Date(date)} locale='en' timeStyle='mini-minute-now' />
					</div>
				</div>
			</div>
			<div className='self-center'>
				{!quotesId ? (
					<Link to={`/${username}`}>
						<img src={forward} alt='forward' className='w2  h2 bg-light-green br-100' />
					</Link>
				) : (
					<Link to={`/quote/${quotesId}`}>
						<img src={forward} alt='forward' className='w2  h2 bg-light-green br-100' />
					</Link>
				)}
			</div>
		</article>
	);
};

export default Notification;
