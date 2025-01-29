import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Link } from 'react-router-dom';

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
                secondary:
                    'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
                outline:
                    'border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-900',
                ghost: 'hover:bg-gray-100 hover:text-gray-900 text-gray-600',
                destructive:
                    'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
            },
            size: {
                sm: 'h-9 px-3',
                md: 'h-10 px-4',
                lg: 'h-11 px-8',
                icon: 'h-10 w-10',
            },
            fullWidth: {
                true: 'w-full',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'md',
            fullWidth: false,
        },
    },
);

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    children: React.ReactNode;
    href?: string;
}

function Button({
    className,
    variant,
    size,
    fullWidth,
    children,
    href,
    ...props
}: ButtonProps) {
    if (href) {
        return (
            <Link
                to={href}
                className={cn(buttonVariants({ variant, size, className }))}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            className={cn(
                buttonVariants({ variant, size, fullWidth, className }),
            )}
            {...props}
        >
            {children}
        </button>
    );
}

export { Button, buttonVariants };
