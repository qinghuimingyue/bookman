<template>
    <div class="approval-list">
        <h3>借书审批</h3>
        <div v-for="request in requests" :key="request.bookId" class="request-item">
            <p>{{ request.userName }} - {{ request.bookName }}</p>
            <button @click="approve(request)">批准</button>
            <button @click="reject(request)">拒绝</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        requests: Array
    },
    methods: {
        approve(request) {
            this.$emit("approve", request);
        },
        reject(request) {
            this.$emit("reject", request);
        }
    }
};
</script>

<style scoped>
.approval-list {
    margin-top: 20px;
}

.request-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
}

.request-item button {
    padding: 8px 15px;
    background-color: #28a745;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}

.request-item button:hover {
    background-color: #218838;
}

.request-item button:last-child {
    background-color: #dc3545;
}

.request-item button:last-child:hover {
    background-color: #c82333;
}
</style>
