export const options = {
    height: 500,
    border: {
        borderColor: 'transparent'
    },
    scales: {
        x: {
            stacked: true,
            beginAtZero: true,
            grid: {
                display: false
            },
        },
        y: {
            stacked: true,
            beginAtZero: true,
        }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                font: {
                    family: 'HelveticaNowText-Regular'
                }
            },
            onClick: (e: Event) => e.stopPropagation()
        },
        tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
                label: function (context: any) {
                    var label = context.dataset.label || '';
                    if (context.dataset.label == 'Total Orders') {
                        return `Total Orders: ${context.parsed._stacks.y[0] + context.parsed._stacks.y[1]}`
                    }
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null) {
                        label += context.parsed.y;
                    }
                    return label;
                },
            }
        }
    }
};