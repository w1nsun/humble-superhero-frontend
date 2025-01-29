import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { FormInput } from '../components/ui/FormInput';

interface FormErrors {
    errors?: Array<{
        message: string;
        path: string[];
    }>;
}

interface FormData {
    name: string;
    super_power: string;
    humility_score: number;
}

export default function SuperHeroForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        super_power: '',
        humility_score: 1,
    });
    const [errors, setErrors] = useState<FormErrors>({ errors: [] });
    const [showSuccess, setShowSuccess] = useState(false);

    const getErrorForField = (fieldName: string) => {
        return errors.errors?.find((error) => error.path.includes(fieldName))
            ?.message;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/superheroes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const data = await response.json();
            setErrors(data);
        } else {
            setFormData({
                name: '',
                super_power: '',
                humility_score: 1,
            });
            setErrors({ errors: [] });
            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
            }, 4000);
        }
    };

    return (
        <div className="flex items-center justify-center px-4 pt-10">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6">
                    Create Superhero
                </h2>

                {showSuccess && (
                    <div className="top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                        Superhero created successfully!
                    </div>
                )}

                <FormInput
                    label="Name"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                    error={getErrorForField('name')}
                    required
                    minLength={1}
                    maxLength={255}
                />

                <FormInput
                    label="Super Power"
                    id="super_power"
                    value={formData.super_power}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            super_power: e.target.value,
                        })
                    }
                    error={getErrorForField('super_power')}
                    required
                    minLength={1}
                    maxLength={255}
                />

                <FormInput
                    label="Humility Score (1-10)"
                    id="humility_score"
                    type="number"
                    value={formData.humility_score}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            humility_score: Number(e.target.value),
                        })
                    }
                    error={getErrorForField('humility_score')}
                    min={1}
                    max={10}
                />

                <div className="flex gap-4">
                    <Button type="button" variant="outline" size="lg" href="/">
                        Cancel
                    </Button>

                    <Button type="submit" variant="default" size="lg" fullWidth>
                        Create
                    </Button>
                </div>
            </form>
        </div>
    );
}
