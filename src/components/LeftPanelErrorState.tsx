import Icon from "src/icons/Icon";

export default function LeftPanelErrorState(): JSX.Element {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4 text-center text-black">
            <Icon name="balloon" fill="transparent" size={42} />
            <h2 className="text-2xl font-bold mb-4">Oops! Our weather balloons got lost</h2>
            <p className="text-gray-600 mb-4">We're having trouble fetching the latest weather data.</p>
            <div className="bg-white p-6 rounded-lg p-4 mb-4">
                <h3 className="font-semibold my-4">While we're sorting things out, why not:</h3>
                <ul className="text-left list-disc list-inside">
                    <li>Look out your window for a quick weather check</li>
                    <li>Practice your rain dance (who knows, it might help!)</li>
                    <li>Imagine your perfect weather day</li>
                </ul>
            </div>
            <button
                className="bg-black text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center text-black"
                onClick={() => window.location.reload()}
            >
                <span>
                    <Icon name="refresh" stroke="white" />
                </span>
                <span>
                    Try Again

                </span>
            </button>
            <p className="mt-4 text-sm text-gray-500 flex items-center">
                If the problem persists, our meteorologists might need a coffee break!
            </p>
        </div>
    );
};