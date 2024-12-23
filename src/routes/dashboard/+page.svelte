<script>
    let items = [];
</script>

<div class="flex flex-col items-center p-6">
    <h1 class="text-3xl font-bold mb-6">eBay Flipper Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each items as item}
            <div class="border border-gray-300 p-4 rounded-lg shadow-md">
                <h2 class="text-xl font-semibold mb-2">{item.title}</h2>
                <p class="text-gray-700">Price: ${item.price}</p>
                <p class="text-gray-700">Status: {item.status}</p>
            </div>
        {/each}
    </div>
</div>
