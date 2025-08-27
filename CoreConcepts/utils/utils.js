function trackMemoryUsageStats(rss, heapTotal, heapUsed) {
  const used = process.memoryUsage();

  // console.log("----MEMORY USAGE-----");
  for (const key in used) {
    if (used.hasOwnProperty(key)) {
      if (key === "rss") {
        rss = Math.max(rss, getProcessStatsInMb(used[key]));
      }
      if (key === "heapTotal") {
        heapTotal = Math.max(heapTotal, getProcessStatsInMb(used[key]));
      }

      if (key === "heapUsed") {
        heapUsed = Math.max(heapUsed, getProcessStatsInMb(used[key]));
      }
      // console.log(`${key} ${getProcessStatsInMb(used[key])} MB`);
    }
  }
  return { rss, heapTotal, heapUsed };
}

function getProcessStatsInMb(stats) {
  return Math.round((stats / 1024 / 1024) * 100) / 100;
}

module.exports = {
  trackMemoryUsageStats,
};
