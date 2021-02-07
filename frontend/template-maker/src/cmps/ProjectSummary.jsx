import React from 'react'

export function ProjectSummary({onDownload}) {
    
    return (
        <div>
            <button onClick={onDownload}>
                Download
            </button>
        </div>
    )
}
