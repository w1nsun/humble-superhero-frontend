import { useState, useEffect } from 'react';

interface Superhero {
    id: string;
    name: string;
    super_power: string;
    humility_score: number;
}

export default function MainPage() {
    const [heroes, setHeroes] = useState<Superhero[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHeroes = async (signal: AbortSignal) => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    'http://localhost:3000/superheroes',
                    { signal },
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setHeroes(data);
            } catch (err) {
                if (err instanceof Error && err.name === 'AbortError') {
                    return;
                }

                setError(
                    err instanceof Error
                        ? err.message
                        : 'Failed to fetch heroes',
                );
            } finally {
                setIsLoading(false);
            }
        };

        const abortController = new AbortController();
        fetchHeroes(abortController.signal);

        return () => {
            abortController.abort();
        };
    }, []);

    if (isLoading) {
        return <div className="container mx-auto px-4 py-8">Loading...</div>;
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8 text-red-600">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {heroes.map((hero) => (
                    <div
                        key={hero.id}
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                    >
                        <h2 className="text-xl font-bold mb-2 text-gray-800">
                            {hero.name}
                        </h2>
                        <p className="text-gray-600 mb-2">
                            <span className="font-medium">Power: </span>
                            {hero.super_power}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-medium">
                                Humility Score:{' '}
                            </span>
                            {hero.humility_score}/10
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
