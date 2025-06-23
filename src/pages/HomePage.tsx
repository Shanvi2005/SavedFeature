import React, { useState } from 'react';
import { Search, Home, Users, Briefcase, MessageCircle, TrendingUp, Bookmark, Bell, ChevronDown, MoreHorizontal, ThumbsUp, MessageSquare, Share, Send, Plus, Video, Calendar, ChevronRight, X } from 'lucide-react';

import Avatar from '../components/Avatar';



const HomePage = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [savedPosts, setSavedPosts] = useState([]);
  const [categorizedPosts, setCategorizedPosts] = useState({
    'Career Insights': [],
    'Tech Resources': [],
    'Learning': [],
    'Inspiration': [],
    'Industry News': [],
    'General': []
  });
  const [showSavedPosts, setShowSavedPosts] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});
  const [commentText, setCommentText] = useState({});
  const [expandedPosts, setExpandedPosts] = useState({});
  const [aiProcessing, setAiProcessing] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);

  // AI Categorization Logic
  const categorizePost = (post) => {
    const content = post.content.toLowerCase();
    const title = post.author.title.toLowerCase();

    // Career-related keywords
    const careerKeywords = ['career', 'job', 'hiring', 'interview', 'resume', 'promotion', 'salary', 'internship', 'opportunity', 'recruiter'];

    // Tech-related keywords
    const techKeywords = ['programming', 'code', 'software', 'development', 'javascript', 'python', 'react', 'api', 'database', 'algorithm', 'tech', 'ai', 'machine learning', 'data science'];

    // Learning-related keywords
    const learningKeywords = ['learn', 'tutorial', 'course', 'education', 'study', 'skill', 'knowledge', 'training', 'certification', 'bootcamp'];

    // Inspiration-related keywords
    const inspirationKeywords = ['motivation', 'inspire', 'success', 'journey', 'achievement', 'growth', 'mindset', 'personal', 'life', 'advice'];

    // Industry news keywords
    const newsKeywords = ['news', 'industry', 'market', 'trend', 'business', 'company', 'startup', 'investment', 'economy', 'report'];

    const checkKeywords = (text, keywords) => {
      return keywords.some(keyword => text.includes(keyword));
    };

    const fullText = `${content} ${title}`;

    if (checkKeywords(fullText, careerKeywords)) return 'Career Insights';
    if (checkKeywords(fullText, techKeywords)) return 'Tech Resources';
    if (checkKeywords(fullText, learningKeywords)) return 'Learning';
    if (checkKeywords(fullText, inspirationKeywords)) return 'Inspiration';
    if (checkKeywords(fullText, newsKeywords)) return 'Industry News';

    return 'General';
  };

  const handleSavePost = async (postId) => {
    const post = posts.find(p => p.id === postId);
    const isCurrentlySaved = savedPosts.includes(postId);

    if (isCurrentlySaved) {
      // Remove from saved posts
      setSavedPosts(prev => prev.filter(id => id !== postId));
      setCategorizedPosts(prev => {
        const newState = { ...prev };
        Object.keys(newState).forEach(category => {
          newState[category] = newState[category].filter(p => p.id !== postId);
        });
        return newState;
      });
    } else {
      // Add to saved posts with AI categorization
      setAiProcessing(prev => ({ ...prev, [postId]: true }));

      // Simulate AI processing delay
      setTimeout(() => {
        const category = categorizePost(post);

        setSavedPosts(prev => [...prev, postId]);
        setCategorizedPosts(prev => ({
          ...prev,
          [category]: [...prev[category], post]
        }));

        setAiProcessing(prev => ({ ...prev, [postId]: false }));
      }, 1500);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  const handleLikePost = (postId) => {
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const toggleExpandPost = (postId) => {
    setExpandedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const truncateText = (text, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const posts = [
    {
      id: 1,
      author: {
        name: "Rishika Gupta",
        title: "Building scalable java backend systems || Senior Software Engineer @L...",
        subtitle: "Following",
        avatar: "/api/placeholder/40/40",
        company: "Company"
      },
      timeAgo: "21h",
      content: `I had 3 months of free Spotify Premium and I didn't know about it???

I just found out that if you're a LinkedIn Premium user, you get free subscriptions to several apps including Spotify and Headspace.

Refer https://lnkd.in/dZpd55TH ✅ to know how to redeem.`,
      image: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=500&h=300&fit=crop",
      likes: 28,
      comments: 26,
      reposts: 1,
      reactions: ["👍", "❤️", "😲"]
    },
    {
      id: 2,
      author: {
        name: "Navdeep Singh",
        title: "Founder of NeetCode",
        subtitle: "Following",
        avatar: "/api/placeholder/40/40"
      },
      timeAgo: "3w",
      content: `Follow System Design School for some really high quality posts!

System Design Interview - 8 Ways to Scale Any System

(Steal these to become the top candidate)`,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
      likes: 194,
      comments: 4,
      reposts: 8,
      reactions: ["👍", "❤️", "😍"],
      hasPromotedContent: true,
      promotedPage: {
        name: "System Design School",
        followers: "3,568 followers",
        timePosted: "3w"
      }
    },
    {
      id: 3,
      author: {
        name: "SMU Office of Research (ORe)",
        title: "20,574 followers",
        subtitle: "Following",
        avatar: "/api/placeholder/40/40"
      },
      timeAgo: "1d",
      content: `SMU Assistant Professor Ma Yunshan's latest research sets out to finetune the way AI predicts stock prices.

#SMUResearch #artificialintelligence #largelanguagemodels #stockpredictions

Follow us for updates on SMU's research!`,
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=300&fit=crop",
      likes: 179,
      comments: 6,
      reposts: 2,
      reactions: ["👍", "❤️", "😍"]
    },
    {
      id: 4,
      author: {
        name: "Upasana Singh",
        title: "Following",
        subtitle: "Exciting opportunity alert! We're hiring iOS interns (Proficient & Backend) for a 6-month on-site...",
        avatar: "/api/placeholder/40/40",
        company: "Company"
      },
      timeAgo: "1d",
      content: `Exciting opportunity alert! We're hiring iOS interns (Proficient & Backend) for a 6-month on-site...

Open Roles:
Frontend (React/NextJS)
Backend (Django)

What You'll Do:
Build user features
Write clean, scalable code
Work with cross-functional team

Requirements:
Interested React Js, Next Js, HTML/CSS
Proficiency in Python/Django. REST API development
Strong Git & learning mindset

Location: Noida (On site only)
Duration: 6 months

Apply now or DM to connect directly.

Follow Upasana Singh

#hiring #internship #jobs`,
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=500&h=300&fit=crop",
      likes: 2,
      comments: 0,
      reposts: 0
    },
    {
      id: 5,
      author: {
        name: "Joy Vishwakarma",
        title: "Tech Enthusiast | Software Engineer | 🚀 Google, Microsoft...",
        subtitle: "5d • 🌍",
        avatar: "/api/placeholder/40/40"
      },
      timeAgo: "5d",
      content: `CTC: 5CR+ package for Tech Interview Prep

With THAT, you get:

✅ DSA: 100% LLD, Core CS Subjects
✅ AptiHub - > SQL (coming soon)
✅ Premium Problems with Company Tags
✅ Daily Hustle: Theory Mode, and more
✅ All in one affordable subscription

Now, if that's even another course, you would require:

- Uploaded videos to Clarity or Play
- Replay building a real platform experience
- Have our own mobile app
- Left out guided journeys and feature depth
- Never thought about gamification learning beyond

But that's not what we'll have for...

Our > # not content delivery. It's a full-fledged learn learning platform.

We are currently running a one day sale today on occasion of PGDAI day - X

👉 Check the Features section on the landing page to see what we'll post.

🔗 https://linkd.in/jxlxlz`,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
      likes: 26,
      comments: 26,
      reposts: 0
    },
    {
      id: 6,
      author: {
        name: "Srishrik Dutta",
        title: "Following",
        subtitle: "Software Engineer | Ex- Microsoft, Wells Fargo | ACM ICPC'20 Regionalist | 6⭐...",
        avatar: "/api/placeholder/40/40"
      },
      timeAgo: "8h",
      content: `Dissecting Problem Solving - Episode 2...

🟦 Difficulty Rating: 900

🟦 Problem Link: https://linkd.in/g_NadU2Q ✅

🟦 Time taken to solve: 7 mins

🟦 My thoughts:

My 1st thought seeing the problem that maybe we should try to maximize the max element, and try something by sorting.

Turns out to be wrong so I had missed the strong ordering of the indexes (i < j always). This gave me the direction that order matters and led to the observation that last element will always be in the finals. So it's best to try maximize that element.

How can I maximize an element? Reduce it by a small positive number or a large negative number. Since small positive numbers can be subtracted, that we know that thought was to try minimize the 2nd last element to use it in the finals.

Here, since all the elements are positive, its best to use this 2nd last element repeatedly and iterate to keep reducing it in each operation. This best element reduction amount turns out to be the prefix sum of the prefix of length n - 2.

Basically we find the sum till n - 2 elements, subtract that from a[n-2] then submit a[n-1] against it as the 2nd last element. Then we get that result we get. This solves the problem.

🟦 Submission Link: https://linkd.in/gVGoGx4 ✅

Next I'll take an 1000 rated problem and try to solve it in the next episode. Do share your suggestions in the comments for the series.

Stay tuned for more such content! 🚀`,
      likes: 15,
      comments: 3,
      reposts: 2
    }
  ];

  const milestones = [
    {
      id: 1,
      title: "Python Development",
      date: "8/1/2024",
      proficiency: "80% Proficiency",
      description: "Advanced skills in Python",
      tag: "Python",
      color: "bg-green-500"
    },
    {
      id: 2,
      title: "Machine Learning Development",
      date: "9/1/2024",
      proficiency: "78% Proficiency",
      description: "Advanced skills in Machine Learning, TensorFlow",
      tags: ["Machine Learning", "TensorFlow"],
      color: "bg-blue-500"
    },
    {
      id: 3,
      title: "TypeScript Development",
      date: "10/1/2024",
      proficiency: "85% Proficiency",
      description: "Advanced skills in TypeScript",
      tag: "TypeScript",
      color: "bg-green-500"
    },
    {
      id: 4,
      title: "JavaScript Development",
      date: "11/1/2024",
      proficiency: "92% Proficiency",
      description: "Advanced skills in JavaScript",
      tag: "JavaScript",
      color: "bg-green-500"
    }
  ];

  if (showSavedPosts) {
    // If a specific category is selected, show that category's posts
    if (selectedCategory) {
      const categoryPosts = categorizedPosts[selectedCategory] || [];

      return (
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <header className="bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-50">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex items-center justify-between h-14">
                {/* Left side - Logo and Search */}
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-sm">in</span>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search"
                      className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Navigation */}
                <nav className="flex items-center space-x-8">
                  {[
                    { name: 'Home', icon: Home },
                    { name: 'My Network', icon: Users },
                    { name: 'Jobs', icon: Briefcase },
                    { name: 'Messaging', icon: MessageCircle },
                    { name: 'Growth AI', icon: TrendingUp },
                    { name: 'Saved', icon: Bookmark }
                  ].map((item) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        setActiveTab(item.name);
                        if (item.name === 'Saved') {
                          setShowSavedPosts(true);
                        } else {
                          setShowSavedPosts(false);
                        }
                      }}
                      className={`flex flex-col items-center space-y-1 px-3 py-2 text-xs transition-colors ${activeTab === item.name
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </button>
                  ))}
                </nav>

                {/* Right side */}
                <div className="flex items-center space-x-4">
                  <Bell className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer" />
                  <div className="w-8 h-8 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition-colors"></div>
                  <ChevronDown className="w-4 h-4 text-gray-600 hover:text-gray-900 cursor-pointer" />
                </div>
              </div>
            </div>
          </header>

          {/* Category Posts Page */}
          <div className="max-w-4xl mx-auto px-4 py-6 pt-20">
            {/* Back button and header */}
            <div className="mb-6">
              <button
                onClick={handleBackToCategories}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-4"
              >
                <ChevronRight className="w-4 h-4 transform rotate-180" />
                <span>Back to Categories</span>
              </button>

              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${selectedCategory === 'Career Insights' ? 'bg-blue-500' :
                  selectedCategory === 'Tech Resources' ? 'bg-green-500' :
                    selectedCategory === 'Learning' ? 'bg-purple-500' :
                      selectedCategory === 'Inspiration' ? 'bg-orange-500' :
                        selectedCategory === 'Industry News' ? 'bg-red-500' :
                          'bg-gray-500'
                  }`}>
                  {selectedCategory === 'Career Insights' && <Briefcase className="w-6 h-6 text-white" />}
                  {selectedCategory === 'Tech Resources' && <div className="text-white font-mono text-lg">&lt;/&gt;</div>}
                  {selectedCategory === 'Learning' && <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-white rounded-full"></div></div>}
                  {selectedCategory === 'Inspiration' && <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center"><div className="w-3 h-3 border-t-2 border-l-2 border-white transform rotate-45"></div></div>}
                  {selectedCategory === 'Industry News' && <div className="w-6 h-6 flex flex-col space-y-1"><div className="w-full h-1 bg-white rounded"></div><div className="w-4 h-1 bg-white rounded"></div><div className="w-full h-1 bg-white rounded"></div></div>}
                  {selectedCategory === 'General' && <Bookmark className="w-6 h-6 text-white" />}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{selectedCategory}</h1>
                  <p className="text-gray-600">{categoryPosts.length} saved post{categoryPosts.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>

            {/* Posts List */}
            {categoryPosts.length > 0 ? (
              <div className="space-y-6">
                {categoryPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow-sm">
                    {/* Post Header */}
                    <div className="p-4 pb-0">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <Avatar name={post.author.name} src={post.author.avatar} size="w-12 h-12" />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                            <p className="text-sm text-gray-600">{post.author.title}</p>
                            <p className="text-xs text-gray-500 mt-1">{post.timeAgo} • 🌍</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Saved
                          </div>
                          <button className="p-2 hover:bg-gray-100 rounded-full">
                            <MoreHorizontal className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="px-4 py-3">
                      <div className="text-gray-800 whitespace-pre-line text-sm leading-relaxed">
                        {expandedPosts[post.id] || post.content.length <= 200
                          ? post.content
                          : truncateText(post.content, 200)
                        }
                        {post.content.length > 200 && (
                          <button
                            onClick={() => toggleExpandPost(post.id)}
                            className="text-blue-600 hover:text-blue-800 font-medium ml-2"
                          >
                            {expandedPosts[post.id] ? 'Show less' : 'Read more'}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Post Image */}
                    {post.image && (
                      <div className="px-4 pb-3">
                        <img src={post.image} alt="Post content" className="w-full rounded-lg" />
                      </div>
                    )}

                    {/* Post Stats */}
                    <div className="px-4 py-2 border-t border-gray-100">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-4">
                          {post.likes > 0 && (
                            <span className="flex items-center space-x-1">
                              <div className="flex -space-x-1">
                                {post.reactions ? (
                                  post.reactions.map((reaction, idx) => (
                                    <div key={idx} className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-xs border border-white">
                                      {reaction === '👍' ? (
                                        <ThumbsUp className="w-2 h-2 text-white fill-current" />
                                      ) : (
                                        <span className="text-[8px]">{reaction}</span>
                                      )}
                                    </div>
                                  ))
                                ) : (
                                  <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                                    <ThumbsUp className="w-2 h-2 text-white fill-current" />
                                  </div>
                                )}
                              </div>
                              <span>{post.likes}</span>
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4">
                          {post.comments > 0 && <span>{post.comments} comments</span>}
                          {post.reposts > 0 && <span>{post.reposts} reposts</span>}
                        </div>
                      </div>
                    </div>

                    {/* Post Actions */}
                    <div className="px-4 py-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => handleLikePost(post.id)}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 ${likedPosts[post.id] ? 'text-blue-600' : 'text-gray-600'
                            }`}
                        >
                          <ThumbsUp className={`w-5 h-5 ${likedPosts[post.id] ? 'fill-current' : ''}`} />
                          <span className="text-sm font-medium">Like</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                          <MessageSquare className="w-5 h-5" />
                          <span className="text-sm font-medium">Comment</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                          <Share className="w-5 h-5" />
                          <span className="text-sm font-medium">Repost</span>
                        </button>
                        <button
                          onClick={() => handleSavePost(post.id)}
                          className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <X className="w-5 h-5" />
                          <span className="text-sm font-medium">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bookmark className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No posts in this category yet</h3>
                <p className="text-gray-500">Save some posts and our AI will categorize them here automatically.</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              {/* Left side - Logo and Search */}
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">in</span>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex items-center space-x-8">
                {[
                  { name: 'Home', icon: Home },
                  { name: 'My Network', icon: Users },
                  { name: 'Jobs', icon: Briefcase },
                  { name: 'Messaging', icon: MessageCircle },
                  { name: 'Growth AI', icon: TrendingUp },
                  { name: 'Saved', icon: Bookmark }
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActiveTab(item.name);
                      if (item.name === 'Saved') {
                        setShowSavedPosts(true);
                      } else {
                        setShowSavedPosts(false);
                      }
                    }}
                    className={`flex flex-col items-center space-y-1 px-3 py-2 text-xs transition-colors ${activeTab === item.name
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </button>
                ))}
              </nav>

              {/* Right side */}
              <div className="flex items-center space-x-4">
                <Bell className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer" />
                <div className="w-8 h-8 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition-colors"></div>
                <ChevronDown className="w-4 h-4 text-gray-600 hover:text-gray-900 cursor-pointer" />
              </div>
            </div>
          </div>
        </header>

        {/* Saved Posts Page */}
        <div className="max-w-6xl mx-auto px-4 py-6 pt-20">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Bookmark className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Smart Saved Posts</h1>
                <p className="text-gray-600">AI-organized content for better discovery and learning</p>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-6 mb-8 border-b">
            <button className="pb-3 border-b-2 border-gray-300 text-gray-600 font-medium">Categories</button>
            <button className="pb-3 text-gray-400">All Posts</button>
            <button className="pb-3 text-gray-400">Digests</button>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Career Insights */}
            <div
              onClick={() => handleCategoryClick('Career Insights')}
              className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white cursor-pointer hover:shadow-lg transition-all transform hover:scale-105"
            >
              <div className="text-center">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold mb-1">Career Insights</h3>
                <p className="text-blue-100 text-xs">{categorizedPosts['Career Insights'].length} posts</p>
              </div>
            </div>

            {/* Tech Resources */}
            <div
              onClick={() => handleCategoryClick('Tech Resources')}
              className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white cursor-pointer hover:shadow-lg transition-all transform hover:scale-105"
            >
              <div className="text-center">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <div className="text-sm font-mono">&lt;/&gt;</div>
                </div>
                <h3 className="text-sm font-semibold mb-1">Tech Resources</h3>
                <p className="text-green-100 text-xs">{categorizedPosts['Tech Resources'].length} posts</p>
              </div>
            </div>

            {/* Learning */}
            <div
              onClick={() => handleCategoryClick('Learning')}
              className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white cursor-pointer hover:shadow-lg transition-all transform hover:scale-105"
            >
              <div className="text-center">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                </div>
                <h3 className="text-sm font-semibold mb-1">Learning</h3>
                <p className="text-purple-100 text-xs">{categorizedPosts['Learning'].length} posts</p>
              </div>
            </div>

            {/* Inspiration */}
            <div
              onClick={() => handleCategoryClick('Inspiration')}
              className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-4 text-white cursor-pointer hover:shadow-lg transition-all transform hover:scale-105"
            >
              <div className="text-center">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 border-t-2 border-l-2 border-white transform rotate-45"></div>
                  </div>
                </div>
                <h3 className="text-sm font-semibold mb-1">Inspiration</h3>
                <p className="text-orange-100 text-xs">{categorizedPosts['Inspiration'].length} posts</p>
              </div>
            </div>

            {/* Industry News */}
            <div
              onClick={() => handleCategoryClick('Industry News')}
              className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-4 text-white cursor-pointer hover:shadow-lg transition-all transform hover:scale-105"
            >
              <div className="text-center">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <div className="w-5 h-5 flex flex-col space-y-0.5">
                    <div className="w-full h-0.5 bg-white rounded"></div>
                    <div className="w-3 h-0.5 bg-white rounded"></div>
                    <div className="w-full h-0.5 bg-white rounded"></div>
                  </div>
                </div>
                <h3 className="text-sm font-semibold mb-1">Industry News</h3>
                <p className="text-red-100 text-xs">{categorizedPosts['Industry News'].length} posts</p>
              </div>
            </div>

            {/* General */}
            <div
              onClick={() => handleCategoryClick('General')}
              className="bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg p-4 text-white cursor-pointer hover:shadow-lg transition-all transform hover:scale-105"
            >
              <div className="text-center">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Bookmark className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold mb-1">General</h3>
                <p className="text-gray-300 text-xs">{categorizedPosts['General'].length} posts</p>
              </div>
            </div>
          </div>

          {/* Show saved posts in categories when not empty */}
          {savedPosts.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recently Categorized Posts</h3>
              {Object.entries(categorizedPosts).map(([category, posts]) => (
                posts.length > 0 && (
                  <div key={category} className="mb-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className={`w-3 h-3 rounded-full ${category === 'Career Insights' ? 'bg-blue-500' :
                        category === 'Tech Resources' ? 'bg-green-500' :
                          category === 'Learning' ? 'bg-purple-500' :
                            category === 'Inspiration' ? 'bg-orange-500' :
                              category === 'Industry News' ? 'bg-red-500' :
                                'bg-gray-500'
                        }`}></div>
                      <h4 className="font-medium text-gray-900">{category}</h4>
                      <span className="text-sm text-gray-500">({posts.length})</span>
                    </div>
                    <div className="grid gap-3">
                      {posts.slice(0, 2).map((post) => (
                        <div key={post.id} className="bg-white border rounded-lg p-3 hover:shadow-md transition-shadow">
                          <div className="flex items-start space-x-3">
                            <Avatar name={post.author.name} src={post.author.avatar} size="w-8 h-8" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <h5 className="font-medium text-sm text-gray-900 truncate">{post.author.name}</h5>
                                <span className="text-xs text-gray-500">{post.timeAgo}</span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                {post.content.substring(0, 120)}...
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          )}

          {/* Empty State Message */}
          {savedPosts.length === 0 && (
            <div className="text-center py-16 mt-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bookmark className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Start saving posts to see them organized here</h3>
              <p className="text-gray-500 max-w-md mx-auto">Our AI will automatically categorize your saved posts to help you find and learn from them more effectively.</p>
              <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-600">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-xs">AI</span>
                </div>
                <span>Powered by intelligent content analysis</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Left side - Logo and Search */}
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">in</span>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-8">
              {[
                { name: 'Home', icon: Home },
                { name: 'My Network', icon: Users },
                { name: 'Jobs', icon: Briefcase },
                { name: 'Messaging', icon: MessageCircle },
                { name: 'Growth AI', icon: TrendingUp },
                { name: 'Saved', icon: Bookmark }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveTab(item.name);
                    if (item.name === 'Saved') {
                      setShowSavedPosts(true);
                    }
                  }}
                  className={`flex flex-col items-center space-y-1 px-3 py-2 text-xs ${activeTab === item.name
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <Bell className="w-5 h-5 text-gray-600" />
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 pt-20">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-3">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
              <div className="h-16 bg-gradient-to-r from-blue-500 to-purple-600"></div>
              <div className="px-4 pb-4">
                <div className="flex flex-col items-center -mt-8">
                  <Avatar name="Shantanu" src="/api/placeholder/64/64" size="w-16 h-16 border-4 border-white" />
                  <h3 className="font-semibold text-gray-900 mt-2 text-center">Shantanu</h3>
                  <p className="text-sm text-gray-600 text-center">LinkedIn Creator || CSE 2025 Future | former Engineer</p>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Profile viewers</span>
                    <span className="text-blue-600 font-medium">235</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-1">
                    <span className="text-gray-600">Post impressions</span>
                    <span className="text-blue-600 font-medium">1,438</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center text-sm text-gray-600">
                    <Bookmark className="w-4 h-4 mr-2" />
                    <span>Your Premium features</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 w-full text-left">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">View Skill Timeline</span>
                </button>
                <button className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 w-full text-left">
                  <Bookmark className="w-4 h-4" />
                  <span className="text-sm">Organize Saved Posts</span>
                </button>
                <button className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 w-full text-left">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Sync GitHub Data</span>
                </button>
              </div>
            </div>


          </div>

          {/* Main Content */}
          <div className="col-span-6">
            {/* Create Post */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <Avatar name="Shantanu" src="/api/placeholder/40/40" />
                <button className="flex-1 text-left px-4 py-3 border border-gray-300 rounded-full text-gray-500 hover:bg-gray-50">
                  Start a post
                </button>
              </div>
              <div className="flex items-center justify-between">
                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Video className="w-5 h-5" />
                  <span className="text-sm font-medium">Video</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <div className="w-5 h-5 bg-gray-400 rounded"></div>
                  <span className="text-sm font-medium">Photo</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm font-medium">Write article</span>
                </button>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm">
                  {/* Post Header */}
                  <div className="p-4 pb-0">
                    {post.hasPromotedContent && post.promotedPage && (
                      <div className="mb-3 p-3 bg-gray-50 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-500">Follow</span>
                          <button className="text-blue-600 text-sm font-medium hover:bg-blue-50 px-3 py-1 rounded">
                            + Follow
                          </button>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-white font-bold text-sm">SDS</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{post.promotedPage.name}</h3>
                            <p className="text-sm text-gray-600">{post.promotedPage.followers}</p>
                            <p className="text-xs text-gray-500 mt-1">{post.promotedPage.timePosted} • 🌍</p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Avatar name={post.author.name} src={post.author.avatar} size="w-12 h-12" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                          <p className="text-sm text-gray-600">{post.author.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{post.timeAgo} • 🌍</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 text-sm font-medium hover:bg-blue-50 px-3 py-1 rounded">
                          + Follow
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                          <MoreHorizontal className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="px-4 py-3">
                    <div className="text-gray-800 whitespace-pre-line text-sm leading-relaxed">
                      {expandedPosts[post.id] || post.content.length <= 200
                        ? post.content
                        : truncateText(post.content, 200)
                      }
                      {post.content.length > 200 && (
                        <button
                          onClick={() => toggleExpandPost(post.id)}
                          className="text-blue-600 hover:text-blue-800 font-medium ml-2"
                        >
                          {expandedPosts[post.id] ? 'Show less' : 'Read more'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Post Image */}
                  {post.image && (
                    <div className="px-4 pb-3">
                      <img src={post.image} alt="Post content" className="w-full rounded-lg" />
                    </div>
                  )}

                  {/* Post Stats */}
                  <div className="px-4 py-2 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        {post.likes > 0 && (
                          <span className="flex items-center space-x-1">
                            <div className="flex -space-x-1">
                              {post.reactions ? (
                                post.reactions.map((reaction, idx) => (
                                  <div key={idx} className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-xs border border-white">
                                    {reaction === '👍' ? (
                                      <ThumbsUp className="w-2 h-2 text-white fill-current" />
                                    ) : (
                                      <span className="text-[8px]">{reaction}</span>
                                    )}
                                  </div>
                                ))
                              ) : (
                                <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                                  <ThumbsUp className="w-2 h-2 text-white fill-current" />
                                </div>
                              )}
                            </div>
                            <span>{post.likes}</span>
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4">
                        {post.comments > 0 && <span>{post.comments} comments</span>}
                        {post.reposts > 0 && <span>{post.reposts} reposts</span>}
                      </div>
                    </div>
                  </div>

                  {/* Post Actions */}
                  <div className="px-4 py-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleLikePost(post.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 ${likedPosts[post.id] ? 'text-blue-600' : 'text-gray-600'
                          }`}
                      >
                        <ThumbsUp className={`w-5 h-5 ${likedPosts[post.id] ? 'fill-current' : ''}`} />
                        <span className="text-sm font-medium">Like</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <MessageSquare className="w-5 h-5" />
                        <span className="text-sm font-medium">Comment</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Share className="w-5 h-5" />
                        <span className="text-sm font-medium">Repost</span>
                      </button>
                      <button
                        onClick={() => handleSavePost(post.id)}
                        className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 ${savedPosts.includes(post.id) ? 'text-blue-600' : 'text-gray-600'
                          }`}
                        disabled={aiProcessing[post.id]}
                      >
                        {aiProcessing[post.id] ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-sm font-medium">AI Categorizing...</span>
                          </div>
                        ) : (
                          <>
                            <Bookmark className={`w-5 h-5 ${savedPosts.includes(post.id) ? 'fill-current' : ''}`} />
                            <span className="text-sm font-medium">Save</span>
                          </>
                        )}
                        {aiProcessing[post.id] && (
                          <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                            AI
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3">
            {/* LinkedIn News */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">LinkedIn News</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                <div className="cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <h4 className="text-sm font-medium text-gray-900">Amazon to invest $2,000 crore in India</h4>
                  <p className="text-xs text-gray-500 mt-1">4hr ago • 94,394 readers</p>
                </div>
                <div className="cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <h4 className="text-sm font-medium text-gray-900">Bollywood losing its stardom</h4>
                  <p className="text-xs text-gray-500 mt-1">3hr ago • 1,456 readers</p>
                </div>
                <div className="cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <h4 className="text-sm font-medium text-gray-900">Fintech firms up for comment</h4>
                  <p className="text-xs text-gray-500 mt-1">5hr ago • 2,394 readers</p>
                </div>
                <div className="cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <h4 className="text-sm font-medium text-gray-900">Power generation hits new high</h4>
                  <p className="text-xs text-gray-500 mt-1">4hr ago • 987 readers</p>
                </div>
              </div>
              <button className="text-sm text-gray-600 mt-3 hover:text-blue-600">Show more ↓</button>
            </div>

            {/* Promoted Content */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500">Promoted</span>
                <button className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=150&fit=crop" alt="Promoted content" className="w-full rounded-lg mb-3" />
              <h4 className="font-medium text-gray-900 mb-1">Advance your career with AI skills</h4>
              <p className="text-sm text-gray-600 mb-3">Learn machine learning and data science from industry experts.</p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;