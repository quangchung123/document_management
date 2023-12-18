export const logoUrl = "https://cdn.haitrieu.com/wp-content/uploads/2022/03/logo-clb-bong-da-ha-noi.png"
export const baseUrl = "http://localhost:8000"
export const baseUrlApi = `${baseUrl}/api`
export const baseStorage = `${baseUrl}/storage`


export const texts = {
    addRow: "Thêm",
    cancelAllChanges: "Hủy",
    cancelRowChanges: "Hủy",
    confirmDeleteMessage: "Xác nhận xóa?",
    deleteRow: "Xóa",
    editRow: "Chỉnh Sửa",
    saveAllChanges: "Lưu",
    saveRowChanges: "Lưu",
    undeleteRow: "Khôi Phục",
    validationCancelChanges: "Hủy Bỏ",
    confirmDeleteTitle: "Thông báo",
}

export const validation = {
    required:"Trường này là bắt buộc"
}


export const sideBarOptions = [
    {
        key: "dashboard",
        name:"Trang chủ",
        router: "/admin",
        icon: "<i class=\"bi bi-boxes\"></i>",
        type:1,
        children: [],
    },
    {
        key: "user",
        name:"Người dùng",
        router: "/admin/user",
        icon: "<i class=\"bi bi-person-video\"></i>",
        type:1,
        children: [],
    },
    {
        key: "user",
        name:"Quản lý phòng",
        router: "/admin/room",
        icon: "<i class=\"bi bi-union\"></i>",
        type:1,
        children: [],
    },
    {
        key: "user",
        name:"Quản lý mức độ",
        router: "/admin/level",
        icon: "<i class=\"bi bi-water\"></i>",
        type:1,
        children: [],
    },
    {
        key: "user",
        name:"Tài liệu công khai",
        router: "/user/publish-document",
        icon: "<i class=\"bi bi-aspect-ratio\"></i>",
        type:3,
        children: [],
    },
    {
        key: "user",
        name:"Tài liệu cá nhân",
        router: "/user/user-document",
        icon: "<i class=\"bi bi-person-badge-fill\"></i>",
        type:2,
        children: [],
    },
    {
        key: "user",
        name:"Tài liệu đơn vị",
        router: "/user/unit-document",
        icon: "<i class=\"bi bi-aspect-ratio\"></i>",
        type:2,
        children: [],
    },
    {
        key: "user",
        name:"Kho tài liệu",
        router: "/admin/document",
        icon: "<i class=\"bi bi-file-bar-graph\"></i>",
        type:1,
        children: [],
    },
]

export const    selectOptionSearch =[
    {
        id: "title",
        label: "Tên công văn",
    },
    {
        id: "code",
        label: "Số hiệu",
    },
    {
        id:  "date",
        label: "Thời gian",
    }
]


export const statusVerify = [
    {
        id:"0",
        name:"Đang chờ"
    },
    {
        id:"1",
        name:"Từ chối"
    },
    {
        id:"2",
        name:"Phê duyệt"
    }
]
