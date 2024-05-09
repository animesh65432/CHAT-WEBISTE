const Error = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-red-500 text-white font-bold rounded-lg border shadow-lg p-5">
        <div className="flex items-center">
          <div className="text-lg font-bold mr-2">Error:</div>
          <div>You are not part of the group</div>
        </div>
      </div>
    </div>
  );
};

export default Error;
