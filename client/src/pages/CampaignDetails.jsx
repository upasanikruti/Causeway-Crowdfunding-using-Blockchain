import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import { calculateBarPercentage, daysLeft } from '../utils';
import { Loader, CountBox, CustomButton } from '../components';
import { thirdweb } from '../assets';

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [comment, setComment] = useState('');
  const [donators, setDonators] = useState([]);
  const [comments, setComments] = useState([]);
  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);
    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  const handleDonate = async () => {
    if (amount === '') {
      window.alert('Please enter a donation amount');
      return;
    }
    setIsLoading(true);
    await donate(state.pId, amount);
    navigate('/');
    setIsLoading(false);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handlePostComment = () => {
    if (comment.trim() === '') return;
    setComments([...comments, comment]);
    setComment('');
  };

  return (
    <div>
      {isLoading && <Loader />}
      <div className="flex flex-col gap-6 md:flex-row md:gap-12 mt-28">
        <div className="md:w-1/2">
          <img src={state.image} alt="campaign" className="w-full h-auto object-cover rounded-xl" />
          <div className="relative h-5 bg-[#3a3a43] mt-2">
            <div className="absolute h-full bg-[#4acd8d]" style={{ width: `${calculateBarPercentage(state.target, state.amountCollected)}%`, maxWidth: '100%' }}></div>
          </div>
          <div className="flex mt-4 justify-between">
            <CountBox title="Days Left" value={remainingDays} />
            <CountBox title={`Raised of ${state.target}`} value={state.amountCollected} />
            <CountBox title="Total Backers" value={donators.length} />
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="flex flex-col gap-6">
            <div>
              <h4 className="font-bold text-lg text-gray-800">Creator</h4>
              <p className="text-base text-gray-600">{state.name}</p>
            </div>
            <div>
              <h4 className="font-bold text-lg text-gray-800">Story</h4>
              <p className="text-base text-gray-600">{state.description}</p>
            </div>
            <div>
              <h4 className="font-bold text-lg text-gray-800">Donators</h4>
              <div className="flex flex-col gap-2">
                {donators.length > 0 ? donators.map((item, index) => (
                  <div key={`${item.donator}-${index}`} className="flex justify-between items-center">
                    <p className="text-base text-gray-600">{index + 1}. {item.donator}</p>
                    <p className="text-base text-gray-600">{item.donation}</p>
                  </div>
                )) : (
                  <p className="text-base text-gray-600">No donators yet. Be the first one!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <div className="mt-8">
          <h4 className="font-bold text-lg text-gray-800">Supporters Comments</h4>
          <div className="flex mt-4">
            <textarea
              rows="4"
              placeholder="Write your comment here..."
              className="flex-1 bg-gray-200 h-16 py-1 px-5 items-center justify-center border border-gray-700 rounded-lg resize-none focus:outline-none focus:border-blue-400"
              value={comment}
              onChange={handleCommentChange}
            ></textarea>
            <CustomButton
              btnType="button"
              title="Post Comment"
              styles="bg-blue-600 h-12 text-white py-2 px-4 ml-4 rounded-lg hover:bg-black-700"
              handleClick={handlePostComment}
            />
          </div>
          {comments.length > 0 && (
            <div className="mt-6">
              <h5 className="font-bold text-lg text-gray-800 mb-2">Comments:</h5>
              {comments.map((comment, index) => (
                <div key={index} className="bg-gray-100 p-3 rounded-lg mb-2">
                  <p className="text-gray-700">{comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>


      {/* Donate section */}
      <div className="mt-8">
        <div className="p-4 bg-gray-900 rounded-lg">
          <p className="text-lg text-white text-semibold mb-4">Fund the campaign</p>
          <input
            type="number"
            placeholder="ETH 0.1"
            step="0.01"
            className="w-full py-3 px-4 outline-none border border-gray-100 bg-gray-300 text-lg text-gray-800 placeholder-gray-400 rounded-lg mb-4"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <CustomButton
            btnType="button"
            title="Donate"
            styles="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            handleClick={handleDonate}
          />
        </div>

        
      </div>
    </div>
  );
};

export default CampaignDetails;
