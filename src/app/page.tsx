import basePath from '@/lib/basePath'
import Button from '../components/ui/Button';
import HomeSearchFilter from '../components/HomeSearchFilter';
import FeaturedProviders from '../components/FeaturedProviders';
import Link from 'next/link';
import { 
  AcademicCapIcon, 
  MagnifyingGlassIcon, 
  UserGroupIcon, 
  ChartBarIcon,
  StarIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import Imagr1 from '../../public/images/undergraduate.jpg'
import Imagr2 from '../../public/images/masters.jpg'
import Imagr3 from '../../public/images/medichine.jpg'
import Imagr4 from '../../public/images/research.jpg'
import Image5  from '../../public/images/engineering.jpg'  
import Image6  from '../../public/images/phd.jpg'    


// Numbers shown on the homepage, read from the API when the static site is built
const getStats = async () => {
    try {
        const all: { country_name: string; fund_type: { name: string }[] }[] = [];
        let url: string | null = `${process.env.NEXT_PUBLIC_API_URL}/scholarships/?page_size=100`;
        while (url) {
            const res: Response = await fetch(url, { cache: 'force-cache' });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            all.push(...data.results);
            url = data.next;
        }
        return {
            total: all.length,
            countries: new Set(all.map((s) => s.country_name)).size,
            fullyFunded: all.filter((s) => s.fund_type.some((f) => f.name === 'Full Funding')).length,
        };
    } catch {
        return { total: null, countries: null, fullyFunded: null };
    }
};

const HomePage = async () => {
    const live = await getStats();
    const features = [
        {
            icon: MagnifyingGlassIcon,
            title: 'Smart Search',
            description: 'Find scholarships that match your profile with our AI-powered search engine.'
        },
        {
            icon: UserGroupIcon,
            title: 'Personalized Matches',
            description: 'Get recommendations tailored to your academic background and interests.'
        },
        {
            icon: ChartBarIcon,
            title: 'Application Tracking',
            description: 'Keep track of all your scholarship applications in one place.'
        }
    ];

    const stats = [
        { number: live.total ? `${live.total}` : '100+', label: 'Scholarships listed' },
        { number: live.countries ? `${live.countries}` : '30+', label: 'Host countries' },
        { number: live.fullyFunded ? `${live.fullyFunded}` : '70+', label: 'Fully funded options' },
        { number: '100%', label: 'Free for students' }
    ];

    return (
        <div className="mx-4 md:mx-8 lg:mx-12">
              {/* Hero Section */}
            <section className="relative z-0">
                <div className="relative bg-cover bg-center rounded-none py-16" style={{ 
                    backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 15%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.1) 85%, rgba(0,0,0,0.5) 100%), url("${basePath}/images/university.jpg")`
                }}>                    <div className="container mx-auto">
                        <div className="text-center mb-16 mx-auto max-w-3xl rounded-2xl bg-white/80 backdrop-blur-sm px-5 py-6 sm:px-8 shadow-sm">
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                                Find your scholarship with ScholarScanner
                            </h1>
                            <p className="text-base sm:text-lg text-gray-700">
                                Search fully funded and partial scholarships from governments, universities and foundations worldwide.
                            </p>
                        </div>
                    </div>
                </div>                
                {/* Filter section - positioned to overlap the hero image */}                <div className="relative z-10 -mt-12 max-w-4xl mx-auto">
                    {/* Using the HomeSearchFilter component which handles the navigation */}
                    <HomeSearchFilter />
                </div></section>            
                {/* Featured Scholarships */}
            <section className="py-12 z-0">
                <div className="container mx-auto">
                    <h2 className="text-2xl font-semibold mb-8">Browse by study level and field</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <Link href="/scholarships/search?levels=Bachelor" className="relative aspect-[3/3.5] group cursor-pointer">
                            <img src={Imagr1.src} alt="Undergraduate" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                            <div className="absolute bottom-3 left-3 bg-white px-2 py-1 text-sm font-medium group-hover:bg-blue-50 transition-colors">
                                Undergraduate
                            </div>
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
                        </Link>
                        
                        {/* 2nd card split into two parts */}
                        <div className="grid grid-rows-2 gap-3">
                            <Link href="/scholarships/search?levels=Master" className="relative aspect-[3/1.7] group cursor-pointer">
                                <img src={Imagr2.src} alt="Master's" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                <div className="absolute bottom-2 left-2 bg-white px-2 py-1 text-xs font-medium group-hover:bg-blue-50 transition-colors">
                                    Master's
                                </div>
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
                            </Link>
                            <Link href="/scholarships/search?scholarship_category=Research" className="relative aspect-[3/1.7] group cursor-pointer">
                                <img src={Imagr4.src} alt="Research" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                <div className="absolute bottom-2 left-2 bg-white px-2 py-1 text-xs font-medium group-hover:bg-blue-50 transition-colors">
                                    Research
                                </div>
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
                            </Link>
                        </div>
                        {/* 4th card split into two parts */}
                        <div className="grid grid-rows-2 gap-3">
                            <Link href="/scholarships/search?field_of_study=Natural%20Sciences" className="relative aspect-[3/1.7] group cursor-pointer">
                            <img src={Imagr3.src} alt="Natural sciences" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                <div className="absolute bottom-2 left-2 bg-white px-2 py-1 text-xs font-medium group-hover:bg-blue-50 transition-colors">
                                    Natural Sciences
                                </div>
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
                            </Link>
                            <Link href="/scholarships/search?field_of_study=Engineering" className="relative aspect-[3/1.7] group cursor-pointer">
                            <img src={Image5.src} alt="Engineering" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                <div className="absolute bottom-2 left-2 bg-white px-2 py-1 text-xs font-medium group-hover:bg-blue-50 transition-colors">
                                    Engineering
                                </div>
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
                            </Link>
                        </div>
                        
                        <Link href="/scholarships/search?levels=PhD" className="relative aspect-[3/3.5] group cursor-pointer">
                            <img src={Image6.src} alt="PhD" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                            <div className="absolute bottom-3 left-3 bg-white px-2 py-1 text-sm font-medium group-hover:bg-blue-50 transition-colors">
                                PhD
                            </div>
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
                        </Link>
                        
                        
                    </div>
                </div>
            </section>{/* Top Scholarship Providers */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto">
                    <div className="flex items-end justify-between gap-4 mb-6">
                        <h2 className="text-2xl font-semibold">Top scholarships</h2>
                        <Link href="/scholarships/search" className="text-sm font-medium text-blue-600 hover:text-blue-800 whitespace-nowrap">View all →</Link>
                    </div>
                    <FeaturedProviders />
                </div>
            </section>
            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>            
            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose ScholarScanner?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We collect prestigious scholarships from official sources, keep the key facts in one place, and help you shortlist the right ones faster.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                                <feature.icon className="h-12 w-12 text-primary-600 mb-6" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>           
             {/* CTA Section */}
            <section className="py-20 bg-primary-600">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                        Ready to Find Your Scholarship?
                    </h2>
                    <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                        Create a free account to save scholarships, track your applications and ask our AI assistant for personalised recommendations.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/Authentication/register">
                            <Button 
                                size="xl" 
                                variant="secondary"
                                className="bg-white text-primary-600 hover:bg-gray-50"
                            >
                                Create Free Account
                            </Button>
                        </Link>
                        <Link href="/scholarships/search/">
                            <Button 
                                size="xl" 
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-primary-600"
                            >
                                Browse Scholarships
                            </Button>
                        </Link>
                    </div>                </div>
            </section>
        </div>
    );
};

export default HomePage;