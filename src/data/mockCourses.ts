import { Course } from '@/lib/api';

export const MOCK_COURSES: Course[] = [
	{
		id: "mock-1",
		courseName: "Python Beginner",
		description: "🎯 30% refund via scholarship test 🎟 20 tokens (missed class buyback) 🚀 2 bootcamps (30% OFF) 🏆 Certificate of completion. Master Python programming fundamentals and build real-world projects.",
		imageUrl: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop&q=60",
		price: 1299,
		token: 20,
		category: "PROGRAMMING",
		difficulty: "BEGINNER",
		durationHours: 40,
		language: "English",
		isFeatured: true,
		mentorId: "mentor-1",
		ratingAverage: 4.8,
		reviewCount: 320,
		_count: {
			enrollments: 1250,
			reviews: 320
		},
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: "mock-2",
		courseName: "Python Bounder (Beginner → Intermediate)",
		description: "🎯 50% refund via scholarship test 🎟 50 tokens (missed class buyback) 🚀 Access to 2 bootcamps (30% OFF) 🏆 Certificate of completion. Complete Python journey from beginner to intermediate level with comprehensive hands-on projects.",
		imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=60",
		price: 1899,
		token: 50,
		category: "PROGRAMMING",
		difficulty: "INTERMEDIATE",
		durationHours: 80,
		language: "English",
		isFeatured: true,
		mentorId: "mentor-2",
		ratingAverage: 4.9,
		reviewCount: 245,
		_count: {
			enrollments: 980,
			reviews: 245
		},
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: "mock-3",
		courseName: "Python Pro Bundle (Beginner to Advanced)",
		description: "🎯 Complete Python mastery package with advanced concepts 🎟 100 tokens 🚀 Lifetime access to all bootcamps 🏆 Professional Certificate. Master Python from basics to advanced including data structures, algorithms, and real-world applications.",
		imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60",
		price: 2999,
		token: 100,
		category: "PROGRAMMING",
		difficulty: "ADVANCED",
		durationHours: 120,
		language: "English",
		isFeatured: true,
		mentorId: "mentor-3",
		ratingAverage: 4.9,
		reviewCount: 180,
		_count: {
			enrollments: 750,
			reviews: 180
		},
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: "mock-4",
		courseName: "Java Beginner",
		description: "🎯 30% refund via scholarship test 🎟 20 tokens (missed class buyback) 🚀 2 bootcamps access 🏆 Certificate of completion. Start your Java programming journey with hands-on projects and real-world applications.",
		imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60",
		price: 1299,
		token: 20,
		category: "PROGRAMMING",
		difficulty: "BEGINNER",
		durationHours: 40,
		language: "English",
		isFeatured: true,
		mentorId: "mentor-4",
		ratingAverage: 4.8,
		reviewCount: 195,
		_count: {
			enrollments: 650,
			reviews: 195
		},
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: "mock-5",
		courseName: "Java Bounder (Beginner → Intermediate)",
		description: "🎯 50% refund via scholarship test 🎟 50 tokens 🚀 2 bootcamps (30% OFF) 🏆 Certificate. Master Java from fundamentals to advanced OOP concepts, collections, and enterprise application development.",
		imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=60",
		price: 1899,
		token: 50,
		category: "PROGRAMMING",
		difficulty: "INTERMEDIATE",
		durationHours: 80,
		language: "English",
		isFeatured: true,
		mentorId: "mentor-5",
		ratingAverage: 4.7,
		reviewCount: 210,
		_count: {
			enrollments: 890,
			reviews: 210
		},
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: "mock-6",
		courseName: "Web Development Beginner",
		description: "🎯 30% refund via scholarship test 🎟 20 tokens 🚀 2 bootcamps access 🏆 Certificate. Learn HTML, CSS, JavaScript basics and build your first websites.",
		imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60",
		price: 1299,
		token: 20,
		category: "WEB_DEVELOPMENT",
		difficulty: "BEGINNER",
		durationHours: 35,
		language: "English",
		isFeatured: false,
		mentorId: "mentor-6",
		ratingAverage: 4.8,
		reviewCount: 165,
		_count: {
			enrollments: 720,
			reviews: 165
		},
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: "mock-7",
		courseName: "Web Development Bounder (Beginner → Intermediate)",
		description: "🎯 50% refund via scholarship test 🎟 50 tokens 🚀 2 bootcamps (30% OFF) 🏆 Certificate. Master frontend and backend development with React, Node.js, and databases.",
		imageUrl: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&auto=format&fit=crop&q=60",
		price: 1899,
		token: 50,
		category: "WEB_DEVELOPMENT",
		difficulty: "INTERMEDIATE",
		durationHours: 85,
		language: "English",
		isFeatured: true,
		mentorId: "mentor-7",
		ratingAverage: 4.9,
		reviewCount: 290,
		_count: {
			enrollments: 1100,
			reviews: 290
		},
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: "mock-12",
		courseName: "Full Stack Development Pro Bundle",
		description: "🎯 70% refund via scholarship test 🎟 100 tokens 🚀 Lifetime bootcamp access 🏆 Professional Certificate. Complete full-stack journey from frontend to backend, DevOps, and cloud deployment.",
		imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&auto=format&fit=crop&q=60",
		price: 2999,
		token: 100,
		category: "WEB_DEVELOPMENT",
		difficulty: "ADVANCED",
		durationHours: 150,
		language: "English",
		isFeatured: true,
		mentorId: "mentor-12",
		ratingAverage: 4.9,
		reviewCount: 175,
		_count: {
			enrollments: 680,
			reviews: 175
		},
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	}
];
